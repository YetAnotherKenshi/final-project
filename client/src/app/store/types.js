import { createAction, createSlice } from "@reduxjs/toolkit";
import typeService from "../services/type.service";
const typesSlice = createSlice({
  name: "types",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    typesRequested: (state) => {
      state.isLoading = true;
    },
    typesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    typesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: typesReducer, actions } = typesSlice;
const { typesRequested, typesReceived, typesRequestFailed } = actions;

export const loadTypesList = () => async (dispatch) => {
  dispatch(typesRequested());
  try {
    const { content } = await typeService.fetchAll();
    dispatch(typesReceived(content));
  } catch (error) {
    dispatch(typesRequestFailed(error.message));
  }
};

export const getTypes = () => (state) => state.types.entities;
export const getTypesLoadingStatus = () => (state) => state.types.isLoading;
export const getTypeById = (id) => (state) => {
  if (state.types.entities) {
    return state.types.entities.find((t) => t._id === id);
  }
  return [];
};

export default typesReducer;
