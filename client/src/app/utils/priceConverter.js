export function convertPrice(price) {
	const newPrice = price.toString();
	return newPrice.slice(0, -3) + ' ' + newPrice.slice(-3) + '₽';
}
