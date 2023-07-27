import { createAction, createSlice } from '@reduxjs/toolkit';
import localStorageService from '../services/localStorage.service';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		entities: [],
		isLoading: true,
		error: null,
	},
	reducers: {
		cartReceived: (state, action) => {
			state.entities = action.payload;
			state.isLoading = false;
		},
		cartEntryAdded: (state, action) => {
			state.entities.push(action.payload);
		},
	},
});

const entriesSaved = createAction('cart/entriesSaved');

const { reducer: cartReducer, actions } = cartSlice;
const { cartReceived, cartEntryAdded } = actions;

export const loadCart = () => (dispatch) => {
	const data = localStorageService.getCart();
	console.log('data', data);
	if (data !== undefined) {
		dispatch(cartReceived(JSON.parse(data)));
	}
};

export const saveCart = () => (dispatch, getState) => {
	const currentState = JSON.stringify(getState().cart.entities);
	localStorageService.setCart(currentState);
	dispatch(entriesSaved());
};

export const addEntry = (payload) => (dispatch) => {
	dispatch(cartEntryAdded(payload));
};

export const getEntries = () => (state) => state.cart.entities;

export default cartReducer;
