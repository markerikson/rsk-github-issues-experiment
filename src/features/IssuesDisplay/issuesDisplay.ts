import { createSlice, PayloadAction } from "redux-starter-kit";

type Overwrite<T1, T2> = { [P in Exclude<keyof T1, keyof T2>]: T1[P] } & T2;

type CurrentDisplay = { displayType: "issues" | "comments"; issueId: number };

type CurrentDisplayPayload = Overwrite<
    CurrentDisplay,
    {
        issueId?: number;
    }
>;

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
    displayType: "issues",
    issueId: 0,
};

type IST = (typeof initialState)["displayType"];

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
        setCurrentDisplayType(state, action: PayloadAction<CurrentDisplayPayload>) {
            const { displayType, issueId } = action.payload;
            state.displayType = displayType;
            if (issueId !== undefined) {
                state.issueId = issueId;
            } else {
                state.issueId = -1;
            }
        },
    },
});

const { actions, reducer } = issuesDisplay;

export const { displayRepo, setCurrentDisplayType, setCurrentPage } = actions;

export default reducer;
