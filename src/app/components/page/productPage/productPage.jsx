import React, { useEffect, useState } from 'react';
import api from '../../../api';
import { convertPrice } from '../../../utils/priceConverter';
import BackHistoryButton from '../../common/backButton';
import Rating from '../../ui/rating';
import settings from '../../../setting.png';
import { Link } from 'react-router-dom';

const ProductPage = ({ productId }) => {
	const [product, setProduct] = useState();
	useEffect(() => {
		api.products.getById(productId).then((data) => setProduct(data));
	}, []);
	return (
		<div className="block">
			<div className="shop-container">
				<BackHistoryButton />
				{product ? (
					<>
						<div className="flex items-center mt-4 mb-4">
							<h2 className="text-4xl">{product.name}</h2>
							<Link to="/admin" className="ml-2 h-6 w-6">
								<button
									className="h-6 w-6 bg-cover"
									style={{
										backgroundImage: `url(${settings})`,
									}}
									onClick={() => console.log(1)}
								></button>
							</Link>
							<Link to="/login" className="ml-auto h-10 w-10">
								<button
									className="h-10 w-10 bg-white rounded-full"
									onClick={() => console.log(1)}
								></button>
							</Link>
						</div>
						<div className="flex items-center">
							<Rating rate={product.rate} />
							<p className="ml-2">5 отзывов</p>
						</div>
						<div className="grid grid-cols-10 mt-3">
							<div className="col-span-3">
								<div className="flex w-96 h-96 bg-white rounded-lg justify-center items-center">
									<img src={product.url} className="w-72 h-72" />
								</div>
							</div>
							<div className="col-span-3">
								<p
									className={`text-lg ml-4 ${
										product.quantity > 0 ? 'text-green-600' : 'text-red-500'
									}`}
								>
									{product.quantity > 0
										? `В наличии: ${product.quantity}шт`
										: 'Нет в наличии'}
								</p>
							</div>
							<div className="col-end-11 col-span-3 bg-white h-48 rounded-lg p-4">
								<p className="text-2xl">{convertPrice(product.price)}</p>
								<button className="bg-purple-500 p-4 w-full h-16  text-white rounded-md mt-2">
									Купить
								</button>
							</div>
						</div>
					</>
				) : (
					<>
						<div className="animate-pulse w-80 h-8 mt-6 bg-slate-300 rounded-md"></div>
						<div className="animate-pulse w-48 h-4 mt-7 bg-slate-300 rounded"></div>
						<div className="grid grid-cols-10 mt-3">
							<div className="col-span-3">
								<div className="animate-pulse w-96 h-96 bg-slate-300 rounded-lg"></div>
							</div>
							<div className="col-span-3">
								<div className="animate-pulse ml-4 w-32 h-6 bg-slate-300 rounded"></div>
							</div>
							<div className="col-end-11 col-span-3">
								<div className="animate-pulse bg-slate-300 h-48 rounded-lg"></div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ProductPage;
