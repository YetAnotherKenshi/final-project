import { createAction, createSlice } from "@reduxjs/toolkit";
import orderService from "../services/order.service";
import { getCurrentUserId } from "./users";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    entities: [],
    isLoading: true,
  },
  reducers: {
    orderRequested: (state) => {
      state.isLoading = true;
    },
    orderRequestFailed: (state) => {
      state.isLoading = false;
    },
    orderReceived: (state, action) => {
      state.entities = action.payload.content;
    },
    orderCreated: (state, action) => {
      state.entities = [...action.payload.content];

      state.isLoading = false;
    },
    orderUpdated: (state, action) => {
      state.entities = action.payload.content;
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
} = actions;

const orderCreationRequested = createAction("orders/orderCreationRequested");
const orderCreationFailed = createAction("orders/orderCreationFailed");

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
  dispatch(orderCreationRequested());
  const currentOrder = [...getState().orders.entities];
  const productIndex = currentOrder.findIndex((i) => i[0] === id);
  const product = [...currentOrder[productIndex]];
  if (type === "increment") {
    product.push(product.pop(product.length - 1) + 1);
    currentOrder.splice(productIndex, 1, product);
  } else if (type === "decrement") {
    product.push(product.pop(product.length - 1) - 1);
    currentOrder.splice(productIndex, 1, product);
  } else if (type === "delete") {
    if (currentOrder.length !== 0) {
      currentOrder.splice(productIndex, 1);
    }
  }
  console.log(currentOrder);
  try {
    if (currentOrder.length > 0) {
      const { content } = await orderService.update({
        _id: getCurrentUserId()(getState()),
        content: currentOrder,
      });
      dispatch(orderUpdated(content));
    } else if (currentOrder.length === 0) {
      const { content } = await orderService.delete();
      if (content === null) {
        dispatch(
          orderUpdated({
            _id: getCurrentUserId()(getState()),
            content: [],
          })
        );
      }
    }
  } catch (error) {
    dispatch(orderCreationFailed(error.message));
  }
};

export const deleteOrder = () => async (dispatch, getState) => {
  dispatch(orderCreationRequested());
  try {
    const { content } = await orderService.delete();
    if (content === null) {
      dispatch(
        orderUpdated({
          _id: getCurrentUserId()(getState()),
          content: [],
        })
      );
    }
  } catch (error) {
    dispatch(orderCreationFailed(error.message));
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
