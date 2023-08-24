import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProductById, updateProduct } from "../../../store/products";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import BackHistoryButton from "../../common/backButton";
import getProductTypes from "../../../utils/productTypes";
import getBrands from "../../../utils/brands";

const EditProductPage = ({ productId }) => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const product = useSelector(getProductById(productId));
  useEffect(() => {
    setData({ ...product });
  }, [product]);
  const productTypes = getProductTypes();
  const brands = getBrands();
  const newProductTypes = convertProductTypes();

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  function convertProductTypes() {
    const newObject = {};
    Object.keys(productTypes).forEach(
      (name) => (newObject[name] = productTypes[name][0])
    );
    return newObject;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ ...data, date: new Date().getTime() }));
    history.push("/shop/all");
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

export default EditProductPage;
