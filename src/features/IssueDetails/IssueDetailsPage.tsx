import React, { useState, useEffect } from "react";

import { getIssue, getComments, Issue, Comment } from "../../api/githubAPI";
import { UserWithAvatar } from "../../components/UserWithAvatar";
import { IssueLabels } from "../../components/IssueLabels";

interface IssueProps {
    issue: Issue;
}

interface IDProps {
    org: string;
    repo: string;
    issueId: number;
    showIssuesList: () => void;
}

const IssueState = ({ issue: { state } }: IssueProps) => (
    <span className={`issue-detail__state issue-detail__state--${state}`}>{state}</span>
);

const IssueNumber = ({ issue }: IssueProps) => <span className="issue-detail__number">#{issue.number}</span>;

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
                <div className="issue-detail__meta" style={{ marginTop: 10 }}>
                    <IssueNumber issue={issue} />
                    <IssueState issue={issue} />
                    <UserWithAvatar user={issue.user} orientation="horizontal" />
                </div>
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
