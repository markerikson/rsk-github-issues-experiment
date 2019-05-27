import React, { useState, useEffect } from "react";

import { getIssues, getRepoDetails, IssuesResult } from "../../api/githubAPI";
import { IssuesPageHeader } from "./IssuesPageHeader";
import { IssuesList } from "./IssuesList";
import { IssuePagination } from "./IssuePagination";

interface Props {
    org: string;
    repo: string;
}

export const IssuesListPage = ({ org, repo }: Props) => {
    const [issuesResult, setIssues] = useState<IssuesResult>({ pageLinks: null, pageCount: 1, issues: [] });
    const [numIssues, setNumIssues] = useState<number>(-1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { issues, pageCount } = issuesResult;

    useEffect(() => {
        async function fetchEverything() {
            async function fetchIssues() {
                const issuesResult = await getIssues(org, repo);
                setIssues(issuesResult);
            }

            async function fetchIssueCount() {
                const repoDetails = await getRepoDetails(org, repo);
                setNumIssues(repoDetails.open_issues_count);
            }

            await Promise.all([fetchIssues(), fetchIssueCount()]);

            setIsLoading(false);
        }

        setIsLoading(true);

        fetchEverything();
    }, [org, repo]);

    const currentPage = Math.min(pageCount, Math.max(1, 1)) - 1;

    let renderedList = isLoading ? <h3>Loading...</h3> : <IssuesList issues={issues} />;

    return (
        <div id="issue-list-page">
            <IssuesPageHeader openIssuesCount={numIssues} org={org} repo={org} />
            {renderedList}
            <IssuePagination currentPage={currentPage} pageCount={pageCount} />
        </div>
    );
};
