import React, { useState, useEffect } from "react";
import { css, cx } from "emotion";
import ReactMarkdown from "react-markdown";

import { insertMentionLinks } from "../../utils/stringUtils";
import { getIssue, getComments, Issue, Comment } from "../../api/githubAPI";
import { IssueMeta } from "./IssueMeta";
import { IssueLabels } from "../../components/IssueLabels";
import { IssueComments } from "./IssueComments";

interface IDProps {
    org: string;
    repo: string;
    issueId: number;
    showIssuesList: () => void;
}

const detailsStyles = css`
    .issue__labels {
        margin-bottom: 2rem;
    }

    .markdown img {
        max-width: 100%;
    }
    .markdown pre {
        border: 1px solid #ccc;
        padding: 0.5rem;
        border-radius: 2px;
        background-color: #f9f9f9;
        overflow-x: auto;
    }
    .markdown p > code {
        padding: 3px 5px;
        border-radius: 2px;
        background-color: #f7f7f7;
    }
`;

const summaryStyles = css`
    margin-bottom: 2rem;
    padding: 0 1rem;
    font-size: 1rem;
    line-height: 1.4rem;
`;

const dividerStyle = css`
    max-width: 80%;
    border: none;
    border-bottom: 1px solid #ccc;
    margin-bottom: 2rem;
`;

export const IssueDetailsPage = ({ org, repo, issueId, showIssuesList }: IDProps) => {
    const [issue, setIssue] = useState<Issue | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentsError, setCommentsError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchIssue() {
            try {
                setCommentsError(null);
                //throw new Error("Panic!!!");
                const issue = await getIssue(org, repo, issueId);
                setIssue(issue);
            } catch (err) {
                setCommentsError(err);
            }
        }

        fetchIssue();
    }, [org, repo, issueId]);

    useEffect(() => {
        async function fetchComments() {
            if (issue !== null) {
                const comments = await getComments(issue.comments_url);
                setComments(comments);
            }
        }

        fetchComments();
    }, [issue]);

    let content;

    const backToIssueListButton = (
        <button className="pure-button" onClick={showIssuesList}>
            Back to Issues List
        </button>
    );

    if (commentsError) {
        return (
            <div className="issue-detail--error">
                {backToIssueListButton}
                <h1>There was a problem loading issue #{issueId}</h1>
                <p>{commentsError.toString()}</p>
            </div>
        );
    }

    if (issue === null) {
        content = (
            <div className="issue-detail--loading">
                {backToIssueListButton}
                <p>Loading issue #{issueId}...</p>
            </div>
        );
    } else {
        let renderedComments = <IssueComments issue={issue} comments={comments} />;

        content = (
            <div className={cx("issue-detail", detailsStyles)}>
                <h1 className="issue-detail__title">{issue.title}</h1>
                {backToIssueListButton}
                <IssueMeta issue={issue} />
                <IssueLabels labels={issue.labels} />
                <hr className={dividerStyle} />
                <div className={summaryStyles}>
                    <ReactMarkdown className="markdown" source={insertMentionLinks(issue.body)} />
                </div>
                <hr className={dividerStyle} />
                <ul>{renderedComments}</ul>
            </div>
        );
    }

    return <div>{content}</div>;
};
