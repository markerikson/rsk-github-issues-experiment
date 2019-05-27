import React, { useState, useEffect } from "react";
import { css } from "emotion";

import { getIssues, getRepoDetails, Issue, IssuesResult } from "../../api/githubAPI";
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

type IssueResponse = typeof getIssues;

export const IssuesListPage = () => {
    const [issuesResult, setIssues] = useState<IssuesResult>({ pageLinks: null, pageCount: 1, issues: [] });
    const [numIssues, setNumIssues] = useState<number>(-1);

    useEffect(() => {
        async function fetchIssues() {
            const issuesResult = await getIssues(ORG, REPO);

            setIssues(issuesResult);
        }

        async function fetchIssueCount() {
            const repoDetails = await getRepoDetails(ORG, REPO);

            setNumIssues(repoDetails.open_issues_count);
        }

        fetchIssues();
        fetchIssueCount();
    }, []);

    const renderedIssues = issuesResult.issues.map(issue => (
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
