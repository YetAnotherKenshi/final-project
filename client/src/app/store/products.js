import { createAction, createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    productsRequested: (state) => {
      state.isLoading = true;
    },
    productsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    productsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    productUpdated: (state, action) => {
      state.entities[
        state.entities.findIndex((p) => p._id === action.payload._id)
      ] = action.payload;
    },
    productCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    productRemoved: (state, action) => {
      state.entities = state.entities.filter((p) => p._id !== action.payload);
    },
  },
});

const { reducer: productsReducer, actions } = productsSlice;
const {
  productsRequested,
  productsReceived,
  productsRequestFailed,
  productUpdated,
  productCreated,
  productRemoved,
} = actions;

const productUpdateRequested = createAction("products/productUpdateRequested");
const productCreationRequested = createAction(
  "products/productCreationRequested"
);
const productRemoveRequested = createAction("products/productRemoveRequested");
const productUpdateFailed = createAction("products/productUpdateRequested");
const productCreationFailed = createAction("products/productCreationRequested");
const productRemoveFailed = createAction("products/productRemoveFailed");

export const loadProductsList = () => async (dispatch) => {
  dispatch(productsRequested());
  try {
    const { content } = await productService.fetchAll();
    dispatch(productsReceived(content));
  } catch (error) {
    dispatch(productsRequestFailed(error.message));
  }
};
export const updateProduct = (payload) => async (dispatch) => {
  dispatch(productUpdateRequested());
  try {
    const { content } = await productService.update(payload);
    dispatch(productUpdated(content));
  } catch (error) {
    dispatch(productUpdateFailed(error.message));
  }
};
export const createProduct = (payload) => async (dispatch) => {
  dispatch(productCreationRequested());
  try {
    const { content } = await productService.create(payload);
    dispatch(productCreated(content));
  } catch (error) {
    dispatch(productCreationFailed(error.message));
  }
};

export const removeProduct = (productId) => async (dispatch) => {
  dispatch(productRemoveRequested());
  try {
    const { content } = await productService.remove(productId);
    if (content === null) {
      dispatch(productRemoved(productId));
    }
  } catch (error) {
    dispatch(productRemoveFailed(error.message));
  }
};

export const getProducts = () => (state) => state.products.entities;
export const getProductsLoadingStatus = () => (state) =>
  state.products.isLoading;
export const getProductById = (id) => (state) => {
  if (state.products.entities) {
    return state.products.entities.find((p) => p._id === id);
  }
  return [];
};
export const getProductsByIds = (ids) => (state) => {
  const data = [];
  for (let product of state.products.entities) {
    if (ids.includes(product._id)) {
      data.push(product);
    }
  }
  return data;
};

export default productsReducer;
