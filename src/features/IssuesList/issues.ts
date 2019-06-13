import { createSlice, PayloadAction, Action } from "redux-starter-kit";
import { ThunkAction } from "redux-thunk";
import { Links } from "parse-link-header";

import { Issue, IssuesResult, getIssue, getIssues } from "api/githubAPI";
import { RootState } from "store";

interface IssuesState {
    issuesByNumber: Record<number, Issue>;
    currentPageIssues: number[];
    pageCount: number;
    pageLinks: Links | null;
    isLoading: boolean;
    error: Error | null;
}

const issuesInitialState: IssuesState = {
    issuesByNumber: {},
    currentPageIssues: [],
    pageCount: 0,
    pageLinks: {},
    isLoading: false,
    error: null,
};

function startLoading(state: IssuesState) {
    state.isLoading = true;
}

function loadingFailed(state: IssuesState, action: PayloadAction<Error>) {
    state.isLoading = false;
    state.error = action.payload;
}

const issues = createSlice({
    slice: "issues",
    initialState: issuesInitialState,
    reducers: {
        getIssueStart: startLoading,
        getIssuesStart: startLoading,
        getIssueSuccess(state, { payload }: PayloadAction<Issue>) {
            const { number } = payload;
            state.issuesByNumber[number] = payload;
            state.isLoading = false;
            state.error = null;
        },
        getIssuesSuccess(state, { payload }: PayloadAction<IssuesResult>) {
            const { pageCount, issues, pageLinks } = payload;
            state.pageCount = pageCount;
            state.pageLinks = pageLinks;
            state.isLoading = false;
            state.error = null;

            issues.forEach(issue => {
                state.issuesByNumber[issue.number] = issue;
            });

            state.currentPageIssues = issues.map(issue => issue.number);
        },
        getIssueFailure: loadingFailed,
        getIssuesFailure: loadingFailed,
    },
});

export const {
    getIssuesStart,
    getIssuesSuccess,
    getIssueStart,
    getIssueSuccess,
    getIssueFailure,
    getIssuesFailure,
} = issues.actions;

export default issues.reducer;

export const fetchIssues = (
    org: string,
    repo: string,
    page?: number
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    try {
        dispatch(getIssuesStart());
        const issues = await getIssues(org, repo, page);
        dispatch(getIssuesSuccess(issues));
    } catch (err) {
        dispatch(getIssuesFailure(err));
    }
};

export const fetchIssue = (
    org: string,
    repo: string,
    number: number
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    try {
        dispatch(getIssueStart());
        const issue = await getIssue(org, repo, number);
        dispatch(getIssueSuccess(issue));
    } catch (err) {
        dispatch(getIssueFailure(err));
    }
};
