import React, { useState, useEffect } from "react";

import { getIssues, getRepoDetails, IssuesResult } from "../../api/githubAPI";
import { IssuesPageHeader } from "./IssuesPageHeader";
import { IssuesList } from "./IssuesList";
import { IssuePagination } from "./IssuePagination";

const ORG = "rails";
const REPO = "rails";

type IssueResponse = typeof getIssues;

export const IssuesListPage = () => {
    const [issuesResult, setIssues] = useState<IssuesResult>({ pageLinks: null, pageCount: 1, issues: [] });
    const [numIssues, setNumIssues] = useState<number>(-1);

    const { issues, pageCount } = issuesResult;

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

    const currentPage = Math.min(pageCount, Math.max(1, 1)) - 1;

    return (
        <div id="issue-list-page">
            <IssuesPageHeader openIssuesCount={numIssues} org={ORG} repo={REPO} />
            <IssuesList issues={issues} />
            <IssuePagination currentPage={currentPage} pageCount={pageCount} />
        </div>
    );
};
