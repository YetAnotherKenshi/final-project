import React from 'react';
import { useSelector } from 'react-redux';
import BackHistoryButton from '../components/common/backButton';
import { getProducts } from '../store/products';
import { convertPrice } from '../utils/priceConverter';

const AdminPanel = () => {
	const products = useSelector(getProducts());
	const productTypes = {
		mouse: 'Мышь',
		keyboard: 'Клавиатура',
	};
	return (
		<div className="bg-neutral-100 h-screen">
			<div className="2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-lg mx-auto">
				<BackHistoryButton />
				<>
					<div className="category">
						<h2 className="text-4xl">Админ панель</h2>
					</div>
					<table className="min-w-full text-center border-separate">
						<thead className="bg-white">
							<tr>
								<th scope="col" className="px-6 py-4 rounded-md">
									Название
								</th>
								<th scope="col" className="px-6 py-4 rounded-md">
									Цена
								</th>
								<th scope="col" className="px-6 py-4 rounded-md">
									Количество
								</th>
								<th scope="col" className="px-6 py-4 rounded-md">
									Тип
								</th>
								<th className="rounded-md"></th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{products.map((product) => {
								const { name, price, quantity, type } = product;
								return (
									<tr>
										<th scope="col" className="px-6 py-6 rounded-md">
											{name}
										</th>
										<th scope="col" className="px-6 py-6 rounded-md">
											{convertPrice(price)}
										</th>
										<th scope="col" className="px-6 py-6 rounded-md">
											{quantity}
										</th>
										<th scope="col" className="px-6 py-6 rounded-md">
											{productTypes[type]}
										</th>
										<th className="py-6 rounded-md">
											<button className="w-36 h-16 bg-purple-500 rounded text-white">
												Изменить
											</button>
										</th>
									</tr>
								);
							})}
						</tbody>
					</table>
				</>
			</div>
		</div>
	);
};

export default AdminPanel;
