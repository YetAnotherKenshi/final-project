import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProducts } from "../../../store/products";
import { getIsLoggedIn } from "../../../store/users";
import { convertPrice } from "../../../utils/priceConverter";
import BackHistoryButton from "../../common/backButton";
import ProductCard from "../../ui/productCard";
import SearchBar from "../../ui/searchBar";
import Slider from "../../ui/slider";

const ProductsListPage = ({ type }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    minPrice: 0,
    maxPrice: 30000,
  });
  const products = useSelector(getProducts());
  function filterProducts() {
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().indexOf(searchQuery.name.toLowerCase()) !==
          -1 &&
        product.price <= searchQuery.maxPrice &&
        product.price >= searchQuery.minPrice
    );
    return searchQuery !== ""
      ? type !== "all"
        ? filteredProducts.filter((p) => p.type === type)
        : filteredProducts
      : products;
  }
  const handleChange = (target) => {
    setSearchQuery((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const filteredProducts = filterProducts();
  return (
    <>
      <BackHistoryButton />
      <h2 className="text-4xl mt-4">Все товары</h2>
      <div className="mt-4 grid grid-cols-4 gap-[15px]">
        <div className="bg-white p-6">
          <div className="name-filter">
            <h3>Название</h3>
            <div className="params">
              <SearchBar
                onChange={handleChange}
                value={searchQuery.name}
                name="name"
              />
            </div>
          </div>
          <hr />
          <div className="p-2">
            <h3>Цена</h3>
            <div className="mt-8">
              <p>
                от {convertPrice(searchQuery.minPrice)} до{" "}
                {convertPrice(searchQuery.maxPrice)}
              </p>
              <Slider
                min={searchQuery.minPrice}
                max={searchQuery.maxPrice}
                onChange={handleChange}
              />
            </div>
          </div>
          <hr />
        </div>

        {products.length > 0 ? (
          filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductCard product={product} />)
          ) : (
            <h1>По запросу ничего не найдено</h1>
          )
        ) : (
          <h1>Загрузка...</h1>
        )}
      </div>
    </>
  );
};

export default ProductsListPage;
