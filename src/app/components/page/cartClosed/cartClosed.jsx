import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from '../../../utils/icons';

const CartClosed = () => {
	return (
		<div className="h-[calc(100vh-5rem)] flex justify-center items-center flex-col">
			<Check />
			<p className="text-3xl mt-2">Спасибо, ваш заказ оформлен</p>
			<Link to="/">
				<p className="text-xl mt-4 text-neutral-500">
					Вернуться на главную страницу
				</p>
			</Link>
		</div>
	);
};

export default CartClosed;
