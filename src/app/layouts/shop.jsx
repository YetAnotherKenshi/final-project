import React from 'react';
import { useParams } from 'react-router-dom';
import EditProductPage from '../components/page/editProductPage/editProductPage';
import ProductPage from '../components/page/productPage/productPage';
import ProductsListPage from '../components/page/productsListPage/productsListPage';

const Shop = () => {
	const params = useParams();
	const { type, productId, edit } = params;
	return (
		<>
			{productId ? (
				edit ? (
					<EditProductPage productId={productId} />
				) : (
					<ProductPage productId={productId} />
				)
			) : (
				<ProductsListPage type={type} />
			)}
		</>
	);
};

export default Shop;
