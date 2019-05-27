import React, { useState } from "react";
import "./App.css";

import { RepoSearchForm } from "./features/RepoSearch/RepoSearchForm";
import { IssuesListPage } from "./features/IssuesList/IssuesListPage";
import { IssueDetailsPage } from "./features/IssueDetails/IssueDetailsPage";

const ORG = "rails";
const REPO = "rails";

type CurrentDisplay =
    | {
          type: "issues";
      }
    | {
          type: "comments";
          issueId: number;
      };

const App: React.FC = () => {
    const [org, setOrg] = useState(ORG);
    const [repo, setRepo] = useState(REPO);
    const [page, setPage] = useState(1);
    const [currentDisplay, setCurrentDisplay] = useState<CurrentDisplay>({ type: "issues" });

    const setOrgAndRepo = (org: string, repo: string) => {
        setOrg(org);
        setRepo(repo);
    };

    const setJumpToPage = (page: number) => {
        setPage(page);
    };

    const showIssuesList = () => {
        setCurrentDisplay({ type: "issues" });
    };

    const showIssueComments = (issueId: number) => {
        setCurrentDisplay({ type: "comments", issueId });
    };

    let content;

    if (currentDisplay.type === "issues") {
        content = (
            <IssuesListPage
                org={org}
                repo={repo}
                page={page}
                setJumpToPage={setJumpToPage}
                showIssueComments={showIssueComments}
            />
        );
    } else {
        const { issueId } = currentDisplay;
        const key = `${org}/${repo}/${issueId}`;
        content = (
            <IssueDetailsPage key={key} org={org} repo={repo} issueId={issueId} showIssuesList={showIssuesList} />
        );
    }

    return (
        <div className="App">
            <RepoSearchForm org={org} repo={repo} setOrgAndRepo={setOrgAndRepo} setJumpToPage={setJumpToPage} />
            {content}
        </div>
    );
};

export default App;
