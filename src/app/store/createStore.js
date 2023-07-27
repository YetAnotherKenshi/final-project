import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';
import commentsReducer from './comments';
import productsReducer from './products';
import usersReducer from './users';

const rootReducer = combineReducers({
	products: productsReducer,
	users: usersReducer,
	comments: commentsReducer,
	cart: cartReducer,
});

export function createStore() {
	return configureStore({
		reducer: rootReducer,
	});
}
