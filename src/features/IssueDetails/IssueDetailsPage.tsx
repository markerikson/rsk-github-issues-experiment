import React, { useState, useEffect } from "react";
import { css, cx } from "emotion";

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

    useEffect(() => {
        async function fetchIssue() {
            const issue = await getIssue(org, repo, issueId);
            setIssue(issue);
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

    if (issue === null) {
        content = (
            <div className="issue-detail--loading">
                <p>Loading issue #{issueId}...</p>
            </div>
        );
    } else {
        let renderedComments = <IssueComments issue={issue} comments={comments} />;

        content = (
            <div className={cx("issue-detail", detailsStyles)}>
                <h1 className="issue-detail__title">{issue.title}</h1>
                <button className="pure-button" onClick={showIssuesList}>
                    Back to Issues List
                </button>
                <IssueMeta issue={issue} />
                <IssueLabels labels={issue.labels} />
                <hr className={dividerStyle} />
                <div className={summaryStyles}>
                    {issue.body.slice(0, 500)}
                    {/*<ReactMarkdown className="markdown" source={insertMentionLinks(issue.body)}/>*/}
                </div>
                <hr className={dividerStyle} />
                <ul>{renderedComments}</ul>
            </div>
        );
    }

    return <div>{content}</div>;
};
