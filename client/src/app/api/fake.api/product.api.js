const products = [
	{
		_id: 'hI_YxUlmpPQN1',
		name: 'SteelSeries Rival 650',
		price: 8299,
		rate: 4.4,
		url: 'https://img.mvideo.ru/Pdb/50126606b.jpg',
		quantity: 12,
		type: 'mouse',
	},
	{
		_id: 'hI_YxUlmpPQN2',
		name: 'Razer Basilisk V3',
		price: 5999,
		rate: 3.2,
		url: 'https://c.dns-shop.ru/thumb/st4/fit/500/500/0688b6e68e3cf983ca50f54ea2d6139f/3ac1e8a2f4ea1ea4d9cd6be5492e297b1c985b231e7cf7e2b659a0585fc6cd27.jpg.webp',
		quantity: 0,
		type: 'mouse',
	},
	{
		_id: 'hI_YxUlmpPQN3',
		name: 'Logitech G703',
		price: 9299,
		rate: 2.8,
		url: 'https://c.dns-shop.ru/thumb/st1/fit/500/500/9de97a43fae5b7da932e670a6da3a0aa/aa9d8e1f992b35f91706946d7266ff52daa9148c29ec6b968de6cedd40fe7d6b.jpg.webp',
		quantity: 12,
		type: 'mouse',
	},
	{
		_id: 'hI_YxUlmpPQN4',
		name: 'Logitech G304',
		price: 5499,
		rate: 3.6,
		url: 'https://c.dns-shop.ru/thumb/st4/fit/500/500/33a27d429e975d7b1ab003e0d75f90f7/2376db27561c83f1cb6b70a49538c01f99fa4bb2235f7abb2f0c5840979066d1.jpg.webp',
		quantity: 12,
		type: 'mouse',
	},
	{
		_id: 'hI_YxUlmpPQN5',
		name: 'HyperX Alloy Core RGB',
		price: 5199,
		rate: 5,
		url: 'https://c.dns-shop.ru/thumb/st4/fit/500/500/e330b799d4a8149a8297c1120a203b89/683198512638e68751cc0303e1ceaa0ed44b9db66c751fed4fa9447ccbae6de1.jpg.webp',
		quantity: 12,
		type: 'keyboard',
	},
	{
		_id: 'hI_YxUlmpPQN6',
		name: 'Razer Huntsman Mini',
		price: 6399,
		rate: 5,
		url: 'https://c.dns-shop.ru/thumb/st1/fit/300/300/594922ce13d0aa450a73a41465fc8f43/4fd9861b151b4545257c22060f2a590b23c5718073e7a5c8c420205e18332f07.jpg.webp',
		quantity: 12,
		type: 'keyboard',
	},
	{
		_id: 'hI_YxUlmpPQN7',
		name: 'Dark Project KD87A',
		price: 7999,
		rate: 5,
		url: 'https://c.dns-shop.ru/thumb/st4/fit/500/500/856ff9133355752655aae30368c060ae/8b32d12f31df8788eeed9ac1b4b659872bd362224533d167d1b690362a242cd6.jpg.webp',
		quantity: 12,
		type: 'keyboard',
	},
];

if (!localStorage.getItem('products')) {
	localStorage.setItem('products', JSON.stringify(products));
}

const fetchAll = () =>
	new Promise((resolve) => {
		window.setTimeout(function () {
			resolve(JSON.parse(localStorage.getItem('products')));
		}, 2000);
	});

const getById = (id) =>
	new Promise((resolve) => {
		window.setTimeout(function () {
			resolve(
				JSON.parse(localStorage.getItem('products')).find(
					(product) => product._id === id
				)
			);
		}, 1000);
	});

export default {
	fetchAll,
	getById,
};
