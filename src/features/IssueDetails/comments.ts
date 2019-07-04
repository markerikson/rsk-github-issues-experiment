import { createSlice, PayloadAction, Action } from "redux-starter-kit";
import { ThunkAction } from "redux-thunk";

import { Comment, getComments, Issue } from "api/githubAPI";
import { RootState } from "store";

interface CommentsState {
    commentsByIssue: Record<number, Comment[] | undefined>;
    loading: boolean;
    error: Error | null;
}

interface CommentLoaded {
    issueId: number;
    comments: Comment[];
}

const initialState: CommentsState = {
    commentsByIssue: {},
    loading: false,
    error: null,
};

const comments = createSlice({
    slice: "comments",
    initialState,
    reducers: {
        getCommentsStart(state) {
            state.loading = true;
            state.error = null;
        },
        getCommentsSuccess(state, action: PayloadAction<CommentLoaded>) {
            const { comments, issueId } = action.payload;
            state.commentsByIssue[issueId] = comments;
            state.loading = false;
            state.error = null;
        },
        getCommentsFailure(state, action: PayloadAction<Error>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { getCommentsStart, getCommentsSuccess, getCommentsFailure } = comments.actions;
export default comments.reducer;

export const fetchComments = (issue: Issue): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
    try {
        dispatch(getCommentsStart());
        const comments = await getComments(issue.comments_url);
        dispatch(getCommentsSuccess({ issueId: issue.number, comments }));
    } catch (err) {
        dispatch(getCommentsFailure(err));
    }
};
