import React from "react";
import { css, cx } from "emotion";
import ReactMarkdown from "react-markdown";

import { insertMentionLinks } from "../../utils/stringUtils";
import { Issue, Comment } from "../../api/githubAPI";
import { UserWithAvatar } from "../../components/UserWithAvatar";

interface ICLProps {
    issue: Issue;
    comments: Comment[];
}

interface ICProps {
    comment: Comment;
}

const commentStyle = css`
    margin-bottom: 1rem;
    border-bottom: 1px solid #ccc;

    .issue-detail__comment__body {
        padding-left: 1rem;
        margin-bottom: 1rem;
    }

    .issue-detail__comment__avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 0.5rem;
        min-width: 40px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    }

    .issue-detail__comment__username {
        font-weight: bold;
    }
`;

function IssueComment({ comment }: ICProps) {
    return (
        <div className={commentStyle}>
            <UserWithAvatar user={comment.user} orientation="horizontal" />

            <div className="issue-detail__comment__body">
                <ReactMarkdown className="markdown" source={insertMentionLinks(comment.body)} />
            </div>
        </div>
    );
}

const commentsListStyle = css`
    padding: 0 1rem;
    > li {
        list-style: none;
    }
`;

export function IssueComments({ comments = [], issue }: ICLProps) {
    // The issue has no comments
    if (issue.comments === 0) {
        return <div className="issue-detail--no-comments">No comments</div>;
    }

    // The issue has comments, but they're not loaded yet
    if (!comments || comments.length === 0) {
        return <div className="issue-detail--comments-loading">Comments loading...</div>;
    }

    // Comments are loaded
    return (
        <ul className={commentsListStyle}>
            {comments.map(comment => (
                <li key={comment.id}>
                    <IssueComment comment={comment} />
                </li>
            ))}
        </ul>
    );
}
