import React from 'react';
import { useParams } from 'react-router-dom';
import CartCheckout from '../components/page/cartCheckout/cartCheckout';
import CartClosed from '../components/page/cartClosed/cartClosed';
import CartPage from '../components/page/cartPage/cartPage';

const Cart = () => {
	const { state } = useParams();
	return state ? (
		state === 'checkout' ? (
			<CartCheckout />
		) : state === 'closed' ? (
			<CartClosed />
		) : (
			<h1>Not Found</h1>
		)
	) : (
		<CartPage />
	);
};

export default Cart;
