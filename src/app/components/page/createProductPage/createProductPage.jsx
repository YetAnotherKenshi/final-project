import React, { useState } from "react";
import { createProduct } from "../../../store/products";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import BackHistoryButton from "../../common/backButton";
import getProductTypes from "../../../utils/productTypes";
import { nanoid } from "@reduxjs/toolkit";

const CreateProductPage = ({ productId }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    name: "",
    price: "",
    quantity: "",
    type: "",
    url: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const productTypes = getProductTypes();

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
      dispatch(createProduct({ ...data, rate: 0, _id: nanoid() }));
      history.push("/shop/all");
    } else {
      setError("Заполнены не все поля");
    }
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
            <SelectField
              label="Тип товара"
              defaultOption="Выбрать..."
              options={productTypes}
              name="type"
              onChange={handleChange}
              value={data.type}
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
