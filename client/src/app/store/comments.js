import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    commentCreationFailed: (state, action) => {
      state.error = action.payload;
    },
    commentRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    },
    commentRemovalFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreated,
  commentCreationFailed,
  commentRemoved,
  commentRemovalFailed,
} = actions;

const commentCreationRequested = createAction(
  "comments/commentCreationRequested"
);
const commentRemovalRequested = createAction(
  "comments/commentRemovalRequested"
);

export const loadCommentsList = (productId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(productId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const loadCommentsByUser = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getCommentsByUser(userId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const createComment = (payload) => async (dispatch) => {
  dispatch(commentCreationRequested());
  try {
    const { content } = await commentService.createComment(payload);
    dispatch(commentCreated(content));
  } catch (error) {
    dispatch(commentCreationFailed(error.message));
  }
};

export const removeComment = (commentId) => async (dispatch) => {
  dispatch(commentRemovalRequested());
  try {
    const { content } = await commentService.removeComment(commentId);
    if (!content) {
      dispatch(commentRemoved(commentId));
    }
  } catch (error) {
    dispatch(commentRemovalFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
