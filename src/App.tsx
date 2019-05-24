import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { IssuesListPage } from "./IssuesListPage";

const App: React.FC = () => {
    return (
        <div className="App">
            <IssuesListPage />
        </div>
    );
};

export default App;
