import React from 'react';
import { Link } from 'react-router-dom';
import { convertPrice } from '../../utils/priceConverter';
import Rating from './rating';

const ProductCard = ({ product }) => {
	return (
		<div className="bg-white p-6 rounded-md">
			<div className="ml-auto mr-0 w-fit">
				<Rating rate={product.rate} />
			</div>

			<img src={product.url} alt={product.name} className="card-img" />
			<Link to={`/shop/${product._id}`}>
				<p>{product.name}</p>

				<p
					className={`product-${
						product.quantity > 0 ? 'available' : 'unavailable'
					}`}
				>
					{product.quantity > 0 ? 'В наличии' : 'Нет в наличии'}
				</p>
				<p className="text-xl">{convertPrice(product.price)}</p>
			</Link>
			<button className="mt-2 w-32 h-14 bg-purple-500 text-white p-2 rounded-md">
				Купить
			</button>
			<i className="favorite"></i>
		</div>
	);
};

export default ProductCard;
