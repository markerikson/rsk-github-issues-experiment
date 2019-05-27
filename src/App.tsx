import React, { useState } from "react";
import "./App.css";

import { RepoSearchForm } from "./features/RepoSearch/RepoSearchForm";
import { IssuesListPage } from "./features/IssuesList/IssuesListPage";

const ORG = "rails";
const REPO = "rails";

const App: React.FC = () => {
    const [org, setOrg] = useState(ORG);
    const [repo, setRepo] = useState(REPO);

    return (
        <div className="App">
            <RepoSearchForm org={org} repo={repo} />
            <IssuesListPage org={org} repo={repo} />
        </div>
    );
};

export default App;
