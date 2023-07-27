import React from 'react';
import { Link } from 'react-router-dom';
import { convertPrice } from '../../utils/priceConverter';
import Rating from './rating';
import { useDispatch } from 'react-redux';
import { addEntry, saveCart } from '../../store/cart';

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(addEntry(product));
		dispatch(saveCart());
	};
	return (
		<div className="bg-white p-6 rounded-md">
			<div className="ml-auto mr-0 w-fit">
				<Rating rate={product.rate} />
			</div>

			<img
				src={product.url}
				alt={product.name}
				className="w-32 xl:w-40 2xl:w-48 mt-8 mb-2 mx-auto"
			/>
			<Link to={`/shop/${product._id}`}>
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
			<button
				className="mt-2 w-32 2xl:w-48 h-14 2xl:h-16 bg-purple-500 text-white p-2 rounded-md"
				onClick={handleClick}
			>
				Купить
			</button>
			<i className="favorite"></i>
		</div>
	);
};

export default ProductCard;
