import React, { useState } from "react";
import { createProduct } from "../../../store/products";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import BackHistoryButton from "../../common/backButton";
import getProductTypes from "../../../utils/productTypes";
import { nanoid } from "@reduxjs/toolkit";
import getBrands from "../../../utils/brands";

const CreateProductPage = ({ productId }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    name: "",
    price: "",
    quantity: "",
    type: "",
    url: "",
    brand: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const productTypes = getProductTypes();
  const newProductTypes = convertProductTypes();
  const brands = getBrands();

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    setError(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !Object.keys(data)
        .map((i) => data[i])
        .includes("")
    ) {
      dispatch(
        createProduct({
          ...data,
          rate: 0,
          _id: nanoid(),
          date: new Date().getTime(),
        })
      );
      history.push("/admin");
    } else {
      setError("Заполнены не все поля");
    }
  };
  function convertProductTypes() {
    const newObject = {};
    Object.keys(productTypes).forEach(
      (name) => (newObject[name] = productTypes[name][0])
    );
    return newObject;
  }
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
            <SelectField
              label="Тип товара"
              defaultOption="Выбрать..."
              options={newProductTypes}
              name="type"
              onChange={handleChange}
              value={data.type}
            />
            <SelectField
              label="Бренд"
              defaultOption="Выбрать..."
              options={brands}
              name="brand"
              onChange={handleChange}
              value={data.brand}
            />
            {error && <h1 className="my-2 text-lg text-red-700">{error}</h1>}
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

export default CreateProductPage;
