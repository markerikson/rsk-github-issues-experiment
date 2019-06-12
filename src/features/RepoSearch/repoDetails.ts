import { createSlice, PayloadAction, Action } from "redux-starter-kit";
import { ThunkAction } from "redux-thunk";

import { getRepoDetails, RepoDetails } from "api/githubAPI";
import { RootState } from "store";

interface RepoDetailsState {
    openIssuesCount: number;
    error: Error | null;
}

const repoDetails = createSlice({
    slice: "repoDetails",
    initialState: {
        openIssuesCount: -1,
        error: null,
    } as RepoDetailsState,
    reducers: {
        getRepoDetailsSuccess(state, action: PayloadAction<RepoDetails>) {
            state.openIssuesCount = action.payload.open_issues_count;
            state.error = null;
        },
        getRepoDetailsFailed(state, action: PayloadAction<Error>) {
            state.openIssuesCount = -1;
            state.error = action.payload;
        },
    },
});

export const { getRepoDetailsSuccess, getRepoDetailsFailed } = repoDetails.actions;

export default repoDetails.reducer;

export const fetchIssuesCount = (
    org: string,
    repo: string
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    try {
        const repoDetails = await getRepoDetails(org, repo);
        dispatch(getRepoDetailsSuccess(repoDetails));
    } catch (err) {
        dispatch(getRepoDetailsFailed(err));
    }
};
