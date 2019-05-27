import React, { useState, useEffect } from "react";
import { css } from "emotion";

import { getIssues, Issue } from "../../api/githubAPI";
import { IssueListItem } from "./IssueListItem";

const ORG = "rails";
const REPO = "rails";

const issuesListStyle = css`
    padding: 0;
    margin: 0;

    > li {
        list-style: none;
    }
`;

export const IssuesListPage = () => {
    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(() => {
        async function fetchIssues() {
            const result = await getIssues(ORG, REPO);

            setIssues(result.data);
        }

        fetchIssues();
    }, []);

    const renderedIssues = issues.map(issue => (
        <li>
            <IssueListItem {...issue} />
        </li>
    ));

    return (
        <div>
            <h2>Issues</h2>
            <ul className={issuesListStyle}>{renderedIssues}</ul>
        </div>
    );
};
