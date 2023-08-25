import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, removeProduct } from "../../../store/products";
import { useHistory } from "react-router-dom";
import BackHistoryButton from "../../common/backButton";
import { convertPrice } from "../../../utils/priceConverter";
import { getTypes } from "../../../store/types";

const AdminPanelPage = () => {
  const [popup, setPopup] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector(getProducts());
  const history = useHistory();
  const productTypes = useSelector(getTypes());
  const handleClick = ({ target }) => {
    history.push(`/shop/all/${target.id}/edit`);
  };
  const handleCreateClick = () => {
    history.push("/admin/create");
  };
  const handlePopup = ({ target }) => {
    setPopup(true);
    setCurrentId(target.id);
  };
  const handleDelete = () => {
    dispatch(removeProduct(currentId));
    setCurrentId(null);
    setPopup(false);
  };
  return (
    <>
      {popup && (
        <div className="w-full h-full bg-neutral-500/50 fixed left-0 top-0 flex justify-center items-center">
          <div className="w-1/2 bg-white p-6 rounded-md">
            <p className="text-lg">Вы точно хотите удалить этот товар?</p>
            <div className="flex gap-4 h-16 mt-6">
              <button
                className="w-full bg-neutral-200 rounded-md font-semibold"
                onClick={() => setPopup(false)}
              >
                Нет
              </button>
              <button
                className="w-full bg-red-500 rounded-md text-white font-semibold"
                onClick={handleDelete}
              >
                Да
              </button>
            </div>
          </div>
        </div>
      )}
      <BackHistoryButton />
      <div className="flex items-center justify-between">
        <h2 className="text-4xl mt-4">Админ панель</h2>
        <button
          className="bg-blue-500 px-8 py-6 text-white font-bold rounded"
          onClick={handleCreateClick}
        >
          Добавить товар
        </button>
      </div>
      <table className="min-w-full text-center border-separate mt-4">
        <thead className="bg-white">
          <tr>
            <th scope="col" className="px-6 py-4 rounded-md">
              Название
            </th>
            <th scope="col" className="px-6 py-4 rounded-md">
              Цена
            </th>
            <th scope="col" className="px-6 py-4 rounded-md">
              Количество
            </th>
            <th scope="col" className="px-6 py-4 rounded-md">
              Тип
            </th>
            <th className="rounded-md"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {products.map((product) => {
            const { name, price, quantity, type, _id, url } = product;
            return (
              <tr>
                <th
                  scope="col"
                  className="px-6 py-6 rounded-md flex gap-2 items-center align-bottom"
                >
                  <img src={url} className="w-16 h-16 object-scale-down" />
                  <p className="text-lg">{name}</p>
                </th>
                <th scope="col" className="px-6 py-6 rounded-md">
                  {convertPrice(price)}
                </th>
                <th scope="col" className="px-6 py-6 rounded-md">
                  {quantity !== 0 ? (
                    quantity
                  ) : (
                    <span className="bg-red-500 px-5 py-2 text-white rounded">
                      {quantity}
                    </span>
                  )}
                </th>
                <th scope="col" className="px-6 py-6 rounded-md">
                  {productTypes &&
                    productTypes.find((t) => t._id === type).singleName}
                </th>
                <th className="py-6 rounded-md">
                  <button
                    className="px-8 py-6 bg-purple-500 rounded text-white"
                    id={_id}
                    onClick={handleClick}
                  >
                    Изменить
                  </button>
                  <button
                    className="px-6 py-6 bg-red-500 rounded text-white ml-2"
                    id={_id}
                    onClick={handlePopup}
                  >
                    Удалить
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AdminPanelPage;
