import httpService from './http.service';

const productEndpoint = 'product/';

const productService = {
	fetchAll: async () => {
		const { data } = await httpService.get(productEndpoint);
		return data;
	},
	update: async (payload) => {
		const { data } = await httpService.patch(
			productEndpoint + payload._id,
			payload
		);
		return data;
	},
};
export default productService;
