import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { css, cx } from "emotion";
import ReactMarkdown from "react-markdown";

import { insertMentionLinks } from "../../utils/stringUtils";
import { IssueMeta } from "./IssueMeta";
import { IssueLabels } from "../../components/IssueLabels";
import { IssueComments } from "./IssueComments";
import { fetchIssue } from "../IssuesList/issues";
import { RootState } from "../../store";
import { fetchComments } from "./comments";

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
    const dispatch = useDispatch();

    const issue = useSelector((state: RootState) => state.issues.issuesByNumber[issueId]);

    const { commentsLoading, commentsError, comments } = useSelector((state: RootState) => {
        return {
            commentsLoading: state.comments.loading,
            commentsError: state.comments.error,
            comments: state.comments.commentsByIssue[issueId],
        };
    }, shallowEqual);

    useEffect(() => {
        if (!issue) {
            dispatch(fetchIssue(org, repo, issueId));
        }
    }, [org, repo, issueId, issue, dispatch]);

    useEffect(() => {
        if (issue) {
            dispatch(fetchComments(issue));
        }
    }, [issue, dispatch]);

    let content;

    const backToIssueListButton = (
        <button className="pure-button" onClick={showIssuesList}>
            Back to Issues List
        </button>
    );

    if (!issue) {
        content = (
            <div className="issue-detail--loading">
                {backToIssueListButton}
                <p>Loading issue #{issueId}...</p>
            </div>
        );
    } else {
        let renderedComments;

        if (comments) {
            renderedComments = <IssueComments issue={issue} comments={comments} />;
        } else if (commentsLoading) {
            renderedComments = (
                <div className="issue-detail--loading">
                    <p>Loading comments...</p>
                </div>
            );
        } else if (commentsError) {
            renderedComments = (
                <div className="issue-detail--error">
                    <h1>Could not load comments for issue #{issueId}</h1>
                    <p>{commentsError.toString()}</p>
                </div>
            );
        }

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
