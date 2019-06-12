import { createSlice, PayloadAction } from "redux-starter-kit";

import { RepoDetails } from "api/githubAPI";

interface RepoDetailsState {
    openIssueCount: number;
    error: Error | null;
}

const repoDetails = createSlice({
    slice: "repoDetails",
    initialState: {
        openIssueCount: -1,
        error: null,
    } as RepoDetailsState,
    reducers: {
        getRepoDetailsSuccess(state, action: PayloadAction<RepoDetails>) {
            state.openIssueCount = action.payload.open_issues_count;
            state.error = null;
        },
        getRepoDetailsFailed(state, action: PayloadAction<Error>) {
            state.openIssueCount = -1;
            state.error = action.payload;
        },
    },
});

export const { getRepoDetailsSuccess, getRepoDetailsFailed } = repoDetails.actions;

export default repoDetails.reducer;
