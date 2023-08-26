import { createAction, createSlice } from "@reduxjs/toolkit";
import orderService from "../services/order.service";
import { getCurrentUserId } from "./users";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    orderRequested: (state) => {
      state.isLoading = true;
    },
    orderReceived: (state, action) => {
      state.entities = action.payload.content;
      state.isLoading = false;
    },
    orderRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    orderCreated: (state, action) => {
      state.entities = [...action.payload.content];
    },
    orderCreationFailed: (state, action) => {
      state.error = action.payload;
    },
    orderUpdated: (state, action) => {
      state.entities = action.payload.content;
    },
    orderUpdateFailed: (state, action) => {
      state.error = action.payload;
    },
    orderRemoved: (state) => {
      state.entities = [];
    },
    orderRemovalFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer: ordersReducer, actions } = ordersSlice;
const {
  orderRequested,
  orderRequestFailed,
  orderReceived,
  orderCreated,
  orderUpdated,
  orderCreationFailed,
  orderUpdateFailed,
  orderRemoved,
  orderRemovalFailed,
} = actions;

const orderCreationRequested = createAction("orders/orderCreationRequested");
const orderUpdateRequested = createAction("orders/orderUpdateRequested");
const orderRemovalRequested = createAction("orders/orderRemovalRequested");

export const loadOrder = () => async (dispatch, getState) => {
  dispatch(orderRequested());
  try {
    const { content } = await orderService.get(getCurrentUserId()(getState()));
    dispatch(orderReceived(content || { content: [] }));
  } catch (error) {
    dispatch(orderRequestFailed(error.message));
  }
};

export const createOrder = (payload) => async (dispatch, getState) => {
  dispatch(orderCreationRequested());
  const currentOrder = getState().orders.entities;
  const order = {
    _id: getCurrentUserId()(getState()),
    content: [...currentOrder, [payload._id, 1]],
  };
  try {
    if (!currentOrder.map((i) => i[0]).includes(payload._id)) {
      const { content } = await orderService.create(order);
      dispatch(orderCreated(content));
    }
  } catch (error) {
    dispatch(orderCreationFailed(error.message));
  }
};

export const updateOrder = (id, type) => async (dispatch, getState) => {
  const currentOrder = [...getState().orders.entities];
  const productIndex = currentOrder.findIndex((i) => i[0] === id);
  const product = type !== "add" && [...currentOrder[productIndex]];
  if (type === "increment") {
    dispatch(orderUpdateRequested());
    product.push(Number(product.pop(product[1])) + 1);
    currentOrder.splice(productIndex, 1, product);
  } else if (type === "decrement") {
    dispatch(orderUpdateRequested());
    product.push(Number(product.pop(product[1])) - 1);
    currentOrder.splice(productIndex, 1, product);
  } else if (type === "add") {
    dispatch(orderUpdateRequested());
    currentOrder.push([id, 1]);
  }
  try {
    const { content } = await orderService.update({
      _id: getCurrentUserId()(getState()),
      content: currentOrder,
    });
    dispatch(orderUpdated(content));
  } catch (error) {
    dispatch(orderUpdateFailed(error.message));
  }
};

export const removeOrder = () => async (dispatch, getState) => {
  dispatch(orderRemovalRequested());
  try {
    const { content } = await orderService.delete();
    if (!content) {
      dispatch(orderRemoved());
    }
  } catch (error) {
    dispatch(orderRemovalFailed(error.message));
  }
};

export const getOrders = () => (state) => state.orders.entities;
export const getOrderById = (id) => (state) =>
  state.orders.entities.find((i) => i[0] === id);
export const getProductIsInOrder = (productId) => (state) => {
  return state.orders.entities.length > 0
    ? state.orders.entities.map((e) => e._id).includes(productId)
    : false;
};

export default ordersReducer;
