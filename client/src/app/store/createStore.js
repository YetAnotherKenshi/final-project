import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commentsReducer from './comments';
import ordersReducer from './orders';
import productsReducer from './products';
import usersReducer from './users';

const rootReducer = combineReducers({
	products: productsReducer,
	users: usersReducer,
	comments: commentsReducer,
	orders: ordersReducer,
});

export function createStore() {
	return configureStore({
		reducer: rootReducer,
	});
}
