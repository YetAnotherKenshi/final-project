import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../../../store/products";
import { convertPrice } from "../../../utils/priceConverter";
import BackHistoryButton from "../../common/backButton";
import ProductCard from "../../ui/productCard";
import SearchBar from "../../ui/searchBar";
import Slider from "../../ui/slider";
import getProductTypes from "../../../utils/productTypes";
import CheckBoxField from "../../ui/checkBoxField";
import _ from "lodash";
import { ArrowDown, ArrowUp } from "../../../utils/icons";
import getBrands from "../../../utils/brands";

const ProductsListPage = ({ type }) => {
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    minPrice: 0,
    maxPrice: 30000,
    type: {},
    brand: {},
  });
  const [sortBy, setSortBy] = useState({ path: "price", order: "asc" });
  const products = useSelector(getProducts()) || [];
  const brands = getBrands();
  function filterProducts() {
    let filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().indexOf(searchQuery.name.toLowerCase()) !==
          -1 &&
        product.price <= searchQuery.maxPrice &&
        product.price >= searchQuery.minPrice
    );
    if (type !== "all") {
      filteredProducts = filteredProducts.filter((p) => p.type === type);
    }
    if (Object.values(searchQuery.type).includes(true)) {
      filteredProducts = filteredProducts.filter(
        (p) => searchQuery.type[p.type] === true
      );
    }
    if (Object.values(searchQuery.brand).includes(true)) {
      filteredProducts = filteredProducts.filter(
        (p) => searchQuery.brand[p.brand] === true
      );
    }
    return filteredProducts;
  }
  const handleChange = (target) => {
    setSearchQuery((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleCheckbox = (target, name) => {
    setSearchQuery({
      ...searchQuery,
      [name]: { ...searchQuery[name], [target.name]: target.checked },
    });
  };
  const handleSort = (path) => {
    if (path === sortBy.path) {
      setSortBy({ ...sortBy, order: sortBy.order === "asc" ? "desc" : "asc" });
    } else {
      setSortBy({ path, order: "asc" });
    }
  };
  const filteredProducts = filterProducts();
  const sortedProducts = _.orderBy(
    filteredProducts,
    [sortBy.path],
    [sortBy.order]
  );
  const productTypes = getProductTypes();
  return (
    <>
      <BackHistoryButton />
      <h2 className="text-4xl mt-4">
        {type === "all" ? "Все товары" : productTypes[type][1]}
      </h2>
      <div className="my-4 grid grid-cols-4 gap-[15px]">
        <div className="bg-white p-6 rounded-md h-fit">
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
          {type === "all" && (
            <>
              <hr />
              <div className="p-2">
                <h3>Тип товара</h3>
                <div className="mt-2">
                  <CheckBoxField
                    name="type"
                    onChange={handleCheckbox}
                    query={searchQuery}
                    items={Object.keys(productTypes).map((i) => ({
                      name: i,
                      label: productTypes[i][0],
                    }))}
                  />
                </div>
              </div>
            </>
          )}
          <hr />
          <div className="p-2">
            <h3>Бренд</h3>
            <div className="mt-2">
              <CheckBoxField
                name="brand"
                onChange={handleCheckbox}
                query={searchQuery}
                items={Object.keys(brands).map((i) => ({
                  name: i,
                  label: brands[i],
                }))}
              />
            </div>
          </div>
        </div>
        <div className="col-span-3">
          {(filteredProducts.length > 0 ||
            Object.values(searchQuery.type).includes(true) ||
            Object.values(searchQuery.brand).includes(true)) && (
            <div className="bg-white rounded-md p-6 flex mb-[15px] items-center">
              <p className="whitespace-nowrap">Сортировать по:</p>
              <div className="flex gap-4 ml-4">
                <div className="flex items-center">
                  <button
                    onClick={() => handleSort("price")}
                    className={
                      sortBy.path === "price"
                        ? "text-black"
                        : "text-neutral-400"
                    }
                  >
                    Цене
                  </button>
                  {sortBy.path === "price" && sortBy.order === "asc" ? (
                    <ArrowUp fill={sortBy.path === "price"} />
                  ) : (
                    <ArrowDown fill={sortBy.path === "price"} />
                  )}
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleSort("date")}
                    className={
                      sortBy.path === "date" ? "text-black" : "text-neutral-400"
                    }
                  >
                    Новизне
                  </button>
                  {sortBy.path === "date" && sortBy.order === "asc" ? (
                    <ArrowUp fill={sortBy.path === "date"} />
                  ) : (
                    <ArrowDown fill={sortBy.path === "date"} />
                  )}
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleSort("rate")}
                    className={
                      sortBy.path === "rate" ? "text-black" : "text-neutral-400"
                    }
                  >
                    Популярности
                  </button>
                  {sortBy.path === "rate" && sortBy.order === "asc" ? (
                    <ArrowUp fill={sortBy.path === "rate"} />
                  ) : (
                    <ArrowDown fill={sortBy.path === "rate"} />
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-3 gap-[15px]">
            {products.length > 0 ? (
              filteredProducts.length > 0 ? (
                sortedProducts.map((product) => (
                  <ProductCard product={product} />
                ))
              ) : (
                <h1 className="text-xl">По запросу ничего не найдено</h1>
              )
            ) : (
              <h1>Загрузка...</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsListPage;
