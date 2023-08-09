import React from 'react';
import { Link } from 'react-router-dom';
import { convertPrice } from '../../utils/priceConverter';
import Rating from './rating';
import ProductAddButton from './productAddButton';

const ProductCard = ({ product }) => {
	return (
		<div className="bg-white p-6 rounded-md">
			<div className="ml-auto mr-0 w-fit">
				<Rating rate={product.rate} max={5} />
			</div>

			<img
				src={product.url}
				alt={product.name}
				className="w-32 xl:w-40 2xl:w-48 mt-8 mb-2 mx-auto"
			/>
			<Link to={`/shop/all/${product._id}`}>
				<p>{product.name}</p>

				<p
					className={`text-sm ${
						product.quantity > 0 ? 'text-green-600' : 'text-red-500'
					}`}
				>
					{product.quantity > 0 ? 'В наличии' : 'Нет в наличии'}
				</p>
				<p className="text-xl mt-6">{convertPrice(product.price)}</p>
			</Link>
			<ProductAddButton product={product} />
		</div>
	);
};

export default ProductCard;
