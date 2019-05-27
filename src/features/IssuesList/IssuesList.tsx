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

export const IssuesList = (props: { issues: Issue[] }) => {
    const renderedIssues = props.issues.map(issue => (
        <li>
            <IssueListItem {...issue} />
        </li>
    ));

    return <ul className={issuesListStyle}>{renderedIssues}</ul>;
};
