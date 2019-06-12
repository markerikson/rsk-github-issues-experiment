import { configureStore } from "redux-starter-kit";

import repoDetailsReducer from "./features/RepoSearch/repoDetails";
import issuesDisplayReducer from "./features/IssuesDisplay/issuesDisplay";

export const store = configureStore({
    reducer: {
        repoDetails: repoDetailsReducer,
        issuesDisplay: issuesDisplayReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
