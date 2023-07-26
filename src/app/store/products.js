const productsSlice = createSlice({
	name: 'products',
	initialState: {
		entities: [],
		isLoading: true,
		error: null,
		lastFetch: null,
	},
	reducers: {
		productsRequested: (state) => {
			state.isLoading = true;
		},
		productsReceived: (state, action) => {
			state.entities = action.payload;
			state.lastFetch = Date.now();
			state.isLoading = false;
		},
		productsRequestFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

const { reducer: productsReducer, actions } = productsSlice;
const { productsRequested, productsReceived, productsRequestFailed } = actions;

export const loadProductsList = () => async (dispatch, getState) => {
	dispatch(productsRequested());
	try {
		// const { content } = await productsService.get();
		dispatch(productsReceived());
	} catch (error) {
		dispatch(productsRequestFailed(error.message));
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

export default productsReducer;
