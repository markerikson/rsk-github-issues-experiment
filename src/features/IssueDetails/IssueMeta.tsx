import React from "react";
import { css, cx } from "emotion";

import { Issue } from "../../api/githubAPI";
import { UserWithAvatar } from "../../components/UserWithAvatar";

interface IssueProps {
    issue: Issue;
}

const stateStyles = css`
    border: 2px solid;
    border-radius: 3px;
    padding: 0.2rem 2rem;
`;

const stateOpenStyles = css`
    border-color: #7cb342;
    background-color: #8bc34a;
    color: #fff;
    font-weight: 600;
`;

const IssueState = ({ issue: { state } }: IssueProps) => (
    <span
        className={cx("issue-detail__state", stateStyles, {
            [stateOpenStyles]: state === "open"
        })}
    >
        {state}
    </span>
);

const numberStyles = css`
    color: #999;
`;

const IssueNumber = ({ issue }: IssueProps) => (
    <span className={cx("issue-detail__number", numberStyles)}>#{issue.number}</span>
);

const metaStyles = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;
`;

export const IssueMeta = ({ issue }: IssueProps) => {
    return (
        <div className={cx("issue-detail__meta", metaStyles)}>
            <IssueNumber issue={issue} />
            <IssueState issue={issue} />
            <UserWithAvatar user={issue.user} orientation="horizontal" />
        </div>
    );
};
