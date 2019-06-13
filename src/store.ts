import { configureStore } from "redux-starter-kit";

import repoDetailsReducer from "./features/RepoSearch/repoDetails";
import issuesDisplayReducer from "./features/IssuesDisplay/issuesDisplay";
import issuesReducer from "./features/IssuesList/issues";

export const store = configureStore({
    reducer: {
        repoDetails: repoDetailsReducer,
        issuesDisplay: issuesDisplayReducer,
        issues: issuesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
