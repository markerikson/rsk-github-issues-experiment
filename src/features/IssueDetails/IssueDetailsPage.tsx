import React, { useState, useEffect } from "react";
import { css, cx } from "emotion";

import { getIssue, getComments, Issue, Comment } from "../../api/githubAPI";
import { IssueMeta } from "./IssueMeta";
import { IssueLabels } from "../../components/IssueLabels";

interface IDProps {
    org: string;
    repo: string;
    issueId: number;
    showIssuesList: () => void;
}

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
        let renderedComments = comments.map(comment => <li key={comment.id}>{comment.id}</li>);

        content = (
            <div className="issue-detail">
                <h1 className="issue-detail__title">{issue.title}</h1>
                <button className="pure-button" onClick={showIssuesList}>
                    Back to Issues List
                </button>
                <IssueMeta issue={issue} />
                <IssueLabels labels={issue.labels} />
                <hr className="divider--short" />
                <div className="issue-detail__summary">
                    {/*<ReactMarkdown className="markdown" source={insertMentionLinks(issue.body)}/>*/}
                </div>
                <hr className="divider--short" />
                <ul>{renderedComments}</ul>
            </div>
        );
    }

    return <div>{content}</div>;
};
