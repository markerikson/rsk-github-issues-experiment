import { createSlice, PayloadAction } from "redux-starter-kit";

type CurrentDisplay = { type: "issues" | "comments"; issueId: number | null };

interface CurrentRepo {
    org: string;
    repo: string;
}

type CurrentDisplayState = {
    page: number;
} & CurrentDisplay &
    CurrentRepo;

let initialState: CurrentDisplayState = {
    org: "rails",
    repo: "rails",
    page: 1,
    type: "issues",
    issueId: null,
};

type IST = (typeof initialState)["type"];

const issuesDisplay = createSlice({
    slice: "issuesDisplay",
    initialState,
    reducers: {
        displayRepo(state, action: PayloadAction<CurrentRepo>) {
            const { org, repo } = action.payload;
            state.org = org;
            state.repo = repo;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setCurrentDisplayType(state, action: PayloadAction<CurrentDisplay>) {
            const { type, issueId } = action.payload;
            state.type = type;
            state.issueId = issueId;
        },
    },
});

const { actions, reducer } = issuesDisplay;

export const { displayRepo, setCurrentDisplayType, setCurrentPage } = actions;

export default reducer;
