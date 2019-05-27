import React, { useState, useEffect } from "react";
import { css } from "emotion";

import { getIssues, getRepoDetails, Issue } from "../../api/githubAPI";
import { IssueListItem } from "./IssueListItem";
import { IssuesPageHeader } from "./IssuesPageHeader";

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
    const [numIssues, setNumIssues] = useState<number>(-1);

    useEffect(() => {
        async function fetchIssues() {
            const result = await getIssues(ORG, REPO);

            setIssues(result.data);
        }

        async function fetchIssueCount() {
            const repoDetails = await getRepoDetails(ORG, REPO);

            setNumIssues(repoDetails.open_issues_count);
        }

        fetchIssues();
        fetchIssueCount();
    }, []);

    const renderedIssues = issues.map(issue => (
        <li>
            <IssueListItem {...issue} />
        </li>
    ));

    return (
        <div>
            <IssuesPageHeader openIssuesCount={numIssues} org={ORG} repo={REPO} />
            <ul className={issuesListStyle}>{renderedIssues}</ul>
        </div>
    );
};
