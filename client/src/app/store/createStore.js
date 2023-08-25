import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./comments";
import ordersReducer from "./orders";
import productsReducer from "./products";
import usersReducer from "./users";
import typesReducer from "./types";
import brandsReducer from "./brands";

const rootReducer = combineReducers({
  products: productsReducer,
  users: usersReducer,
  comments: commentsReducer,
  orders: ordersReducer,
  types: typesReducer,
  brands: brandsReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
