import httpService from './http.service';
import localStorageService from './localStorage.service';

const userEndpoint = 'order/';

const userService = {
	get: async (id) => {
		const { data } = await httpService.get(userEndpoint + id);
		return data;
	},
	create: async (payload) => {
		const { data } = await httpService.patch(
			userEndpoint + payload._id,
			payload
		);
		return data;
	},
	update: async (payload) => {
		const { data } = await httpService.put(
			userEndpoint + localStorageService.getUserId(),
			payload
		);
		return data;
	},
	delete: async () => {
		const { data } = await httpService.delete(
			userEndpoint + localStorageService.getUserId()
		);
		return data;
	},
};
export default userService;
