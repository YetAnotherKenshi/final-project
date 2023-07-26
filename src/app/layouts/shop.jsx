import React from 'react';
import { useParams } from 'react-router-dom';
import ProductPage from '../components/page/productPage/productPage';
import ProductsListPage from '../components/page/productsListPage/productsListPage';

const Shop = () => {
	const params = useParams();
	const { productId } = params;
	console.log(productId ? '1' : '0');
	return (
		<>
			{productId ? <ProductPage productId={productId} /> : <ProductsListPage />}
		</>
	);
};

export default Shop;
