import React from "react";
import "./App.css";

import { IssuesListPage } from "./features/IssuesList/IssuesListPage";

const App: React.FC = () => {
    return (
        <div className="App">
            <IssuesListPage />
        </div>
    );
};

export default App;
