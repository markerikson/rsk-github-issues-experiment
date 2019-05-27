import React from "react";
import { css } from "emotion";

import { IssueListItem } from "./IssueListItem";
import { Issue } from "../../api/githubAPI";

const issuesListStyle = css`
    padding: 0;
    margin: 0;

    > li {
        list-style: none;
    }
`;

interface Props {
    issues: Issue[];
    showIssueComments: (issueId: number) => void;
}

export const IssuesList = ({ issues, showIssueComments }: Props) => {
    const renderedIssues = issues.map(issue => (
        <li key={issue.id}>
            <IssueListItem {...issue} showIssueComments={showIssueComments} />
        </li>
    ));

    return <ul className={issuesListStyle}>{renderedIssues}</ul>;
};
