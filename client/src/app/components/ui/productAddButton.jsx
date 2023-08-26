import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  removeOrder,
} from "../../store/orders";
import { getIsLoggedIn } from "../../store/users";

const ProductAddButton = ({ product, full }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const history = useHistory();
  const orderProduct = useSelector(getOrderById(product._id));
  const currentOrder = useSelector(getOrders());
  console.log(product.quantity);
  const handleClick = () => {
    if (isLoggedIn) {
      if (Number(product.quantity) !== 0) {
        if (currentOrder.length === 0) {
          dispatch(createOrder(product));
        } else {
          dispatch(updateOrder(product._id, "add"));
        }
      }
    } else {
      history.push("/auth/login");
    }
  };
  const handleIncrement = () => {
    if (Number(orderProduct[1]) + 1 <= product.quantity) {
      dispatch(updateOrder(product._id, "increment"));
    }
  };
  const handleDecrement = () => {
    if (orderProduct[1] - 1 > 0) {
      dispatch(updateOrder(product._id, "decrement"));
    } else {
      dispatch(removeOrder());
    }
  };
  return orderProduct !== null && orderProduct !== undefined ? (
    <div className="flex mt-2 gap-2">
      <button
        className={`${
          full ? "w-2/3" : "w-full"
        } h-14 2xl:h-16 bg-gray-200 text-gray-600 pointer-events-none p-2 rounded-md`}
        onClick={handleClick}
      >
        В корзине
      </button>
      <div className={`flex items-center ${full ? "w-1/3" : "w-full"}`}>
        <button
          className="w-full h-14 2xl:h-16 bg-gray-200 text-gray-600 p-2 rounded-md"
          onClick={handleDecrement}
        >
          -
        </button>
        <div className="h-14 w-full 2xl:h-16 flex items-center justify-center">
          {orderProduct === null ? 0 : orderProduct[1]}
        </div>
        <button
          className="w-full h-14 2xl:h-16 bg-gray-200 text-gray-600 p-2 rounded-md"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  ) : (
    <button
      className={`mt-2 w-${
        full ? "full" : "1/2"
      } h-14 2xl:h-16 bg-purple-500 text-white p-2 rounded-md`}
      onClick={handleClick}
    >
      Купить
    </button>
  );
};

export default ProductAddButton;
