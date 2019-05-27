import React, { useState } from "react";
import "./App.css";

import { RepoSearchForm } from "./features/RepoSearch/RepoSearchForm";
import { IssuesListPage } from "./features/IssuesList/IssuesListPage";

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

    return (
        <div className="App">
            <RepoSearchForm org={org} repo={repo} setOrgAndRepo={setOrgAndRepo} setJumpToPage={setJumpToPage} />
            <IssuesListPage org={org} repo={repo} page={page} setJumpToPage={setJumpToPage} />
        </div>
    );
};

export default App;
