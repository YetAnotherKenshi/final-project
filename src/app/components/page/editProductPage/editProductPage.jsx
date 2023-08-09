import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getProductById, updateProduct } from '../../../store/products';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BackHistoryButton from '../../common/backButton';

const EditProductPage = ({ productId }) => {
	const [data, setData] = useState();
	const dispatch = useDispatch();
	const history = useHistory();
	const product = useSelector(getProductById(productId));
	useEffect(() => {
		setData({ ...product });
	}, [product]);
	const productTypes = {
		mouse: 'Мышь',
		keyboard: 'Клавиатура',
		headphones: 'Наушники',
	};

	const handleChange = (target) => {
		setData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateProduct(data));
		history.push('/shop/all');
	};
	return (
		data && (
			<>
				<BackHistoryButton />
				<div className="flex justify-center mt-8">
					<form
						onSubmit={handleSubmit}
						className="bg-white p-16 w-1/2 rounded-xl shadow-lg"
					>
						<TextField
							label="Название"
							name="name"
							value={data.name}
							onChange={handleChange}
						/>
						<TextField
							label="URL"
							name="url"
							value={data.url}
							onChange={handleChange}
						/>
						<TextField
							label="Цена"
							name="price"
							value={data.price}
							onChange={handleChange}
							type="number"
						/>
						<TextField
							label="Количество"
							name="quantity"
							value={data.quantity}
							onChange={handleChange}
							type="number"
						/>
						<TextField
							label="Рейтинг"
							name="rate"
							value={data.rate}
							onChange={handleChange}
							type="number"
						/>
						<SelectField
							label="Тип товара"
							defaultOption="Выбрать..."
							options={productTypes}
							name="type"
							onChange={handleChange}
							value={data.type}
						/>
						<button
							type="submit"
							className="w-full h-12 bg-purple-500 rounded text-white"
						>
							Обновить
						</button>
					</form>
				</div>
			</>
		)
	);
};

export default EditProductPage;
