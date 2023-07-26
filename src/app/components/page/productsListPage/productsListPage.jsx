import React, { useEffect, useState } from 'react';
import api from '../../../api';
import BackHistoryButton from '../../common/backButton';
import ProductCard from '../../ui/productCard';
import SearchBar from '../../ui/searchBar';

const ProductsListPage = () => {
	const [products, setProducts] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	useEffect(() => {
		api.products.fetchAll().then((data) => setProducts(data));
	}, []);
	function filterProducts() {
		const filteredProducts =
			searchQuery !== ''
				? products.filter(
						(product) =>
							product.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
							-1
				  )
				: products;
		return filteredProducts;
	}
	function handleSearchQuery({ target }) {
		setSearchQuery(target.value);
	}
	const filteredProducts = filterProducts();
	return (
		<div className="block">
			<div className="shop-container">
				<BackHistoryButton />
				<h2 className="category">Все товары</h2>
				<div className="goods">
					<div className="filter">
						<div className="name-filter">
							<h3>Название</h3>
							<div className="params">
								<SearchBar onChange={handleSearchQuery} value={searchQuery} />
							</div>
						</div>
						<hr />
						<div className="price-filter">
							<h3>Цена</h3>
							<div className="params">
								<p>от 4 999Р до 11 999Р</p>
								<div className="slider"></div>
							</div>
						</div>
					</div>

					{products.length > 0 ? (
						filteredProducts.length > 0 ? (
							filteredProducts.map((product) => (
								<ProductCard product={product} />
							))
						) : (
							<h1>По запросу ничего не найдено</h1>
						)
					) : (
						<h1>Загрузка...</h1>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductsListPage;
