import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "redux-starter-kit";

import repoDetailsReducer from "./features/RepoSearch/repoDetails";
import issuesDisplayReducer from "./features/IssuesDisplay/issuesDisplay";

const store = configureStore({
    reducer: {
        repoDetails: repoDetailsReducer,
        issuesDisplay: issuesDisplayReducer,
    },
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
