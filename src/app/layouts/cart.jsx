import React from 'react';
import { useSelector } from 'react-redux';
import { getEntries } from '../store/cart';

const Cart = () => {
	const entries = useSelector(getEntries());
	return (
		<div>
			{entries.map((e) => (
				<p>{e.name}</p>
			))}
		</div>
	);
};

export default Cart;
