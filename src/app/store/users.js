import { createAction, createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import localStorageService from '../services/localStorage.service';
import userService from '../services/user.service';
import { generateAuthError } from '../utils/genetateAuthError';
import getRandomInt from '../utils/getRandomInt';
import history from '../utils/history';

const initialState = localStorageService.getAccessToken()
	? {
			entities: [],
			isLoading: true,
			error: null,
			auth: { userId: localStorageService.getUserId() },
			isLoggedIn: true,
			dataLoaded: false,
	  }
	: {
			entities: [],
			isLoading: false,
			error: null,
			auth: null,
			isLoggedIn: false,
			dataLoaded: false,
	  };

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		usersRequested: (state) => {
			state.isLoading = true;
		},
		usersReceived: (state, action) => {
			state.entities = action.payload;
			state.dataLoaded = true;
			state.isLoading = false;
		},
		usersRequestFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		authRequestSuccessed: (state, action) => {
			state.auth = { ...action.payload };
			state.isLoggedIn = true;
		},
		authRequestFailed: (state, action) => {
			state.error = action.payload;
		},
		userCreated: (state, action) => {
			if (!Array.isArray(state.entities)) {
				state.entities = [];
			}
			state.entities.push(action.payload);
		},
		userLoggedOut: (state) => {
			state.auth = null;
			state.isLoggedIn = false;
			state.entities = [];
			state.dataLoaded = false;
		},
		authRequested: (state) => {
			state.error = null;
		},
	},
});

const { reducer: usersReducer, actions } = usersSlice;
const {
	usersRequested,
	usersReceived,
	usersRequestFailed,
	authRequestSuccessed,
	authRequestFailed,
	userCreated,
	userLoggedOut,
	authRequested,
} = actions;

const userCreationRequested = createAction('users/userCreationRequested');
const userCreationFailed = createAction('users/userCreationFailed');

export const login =
	({ payload, redirect }) =>
	async (dispatch) => {
		const { email, password } = payload;
		dispatch(authRequested());
		try {
			const data = await authService.login({ email, password });
			dispatch(authRequestSuccessed({ userId: data.localId }));
			localStorageService.setTokens(data);
			history.push(redirect);
		} catch (error) {
			const { code, message } = error.response.data.error;
			if (code === 400) {
				const errorMessage = generateAuthError(message);
				dispatch(authRequestFailed(errorMessage));
			} else {
				dispatch(authRequestFailed(error.message));
			}
		}
	};

export const signUp =
	({ email, password, ...rest }) =>
	async (dispatch) => {
		dispatch(authRequested());
		try {
			const data = await authService.register({ email, password });
			localStorageService.setTokens(data);
			dispatch(authRequestSuccessed({ userId: data.localId }));
			dispatch(
				createUser({
					_id: data.localId,
					email,
					rate: getRandomInt(1, 5),
					completedMeetings: getRandomInt(0, 200),
					image: `https://avatars.dicebear.com/api/avataaars/${(
						Math.random() + 1
					)
						.toString(36)
						.substring(7)}.svg`,
					...rest,
				})
			);
		} catch (error) {
			dispatch(authRequestFailed(error.message));
		}
	};

export const logOut = () => (dispatch) => {
	localStorageService.removeAuthData();
	dispatch(userLoggedOut());
	history.push('/');
};

function createUser(payload) {
	return async function (dispatch) {
		dispatch(userCreationRequested());
		try {
			const { content } = await userService.create(payload);
			dispatch(userCreated(content));
			history.push('/users');
		} catch (error) {
			dispatch(userCreationFailed(error.message));
		}
	};
}

export const loadUsersList = () => async (dispatch) => {
	dispatch(usersRequested());
	try {
		const { content } = await userService.get();
		dispatch(usersReceived(content));
	} catch (error) {
		dispatch(usersRequestFailed(error.message));
	}
};

export const getUsersList = () => (state) => state.users.entities;
export const getCurrentUserData = () => (state) => {
	if (state.users.entities) {
		return state.users.entities.find((u) => u._id === state.users.auth.userId);
	}
	return null;
};

export const getUserById = (userId) => (state) => {
	if (state.users.entities) {
		return state.users.entities.find((u) => u._id === userId);
	}
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getAuthErrors = () => (state) => state.users.error;

export default usersReducer;
