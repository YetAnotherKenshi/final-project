import React from "react";
import { getOrderById, removeOrder, updateOrder } from "../../store/orders";
import { convertPrice } from "../../utils/priceConverter";
import { useDispatch, useSelector } from "react-redux";

const CartProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const orderProduct = useSelector(getOrderById(product._id));
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
  return (
    <div className="flex bg-white py-8 px-10 justify-between rounded-md mb-4">
      <div className="flex items-center">
        <img
          src={product.url}
          alt=""
          className="w-32 h-32 mr-8 object-contain"
        />
        <div>
          <p className="text-xl">{product.name}</p>
          <p className="text-sm text-green-600">
            В наличии: {product.quantity}шт.
          </p>
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center w-max mr-12">
          <button
            className="mt-2 w-12 2xl:w-14 h-14 2xl:h-16 bg-gray-200 text-gray-600 p-2 rounded-l-md ml-2"
            onClick={() => handleDecrement(product._id)}
          >
            -
          </button>
          <div className="w-16 h-14 2xl:h-16 mt-2 flex items-center justify-center bg-gray-50">
            {orderProduct[1]}
          </div>
          <button
            className="mt-2 w-12 2xl:w-14 h-14 2xl:h-16 bg-gray-200 text-gray-600 p-2 rounded-r-md"
            onClick={() => handleIncrement(product._id)}
          >
            +
          </button>
        </div>
        <div className="w-20 flex items-center justify-center text-lg">
          {convertPrice(product.price * orderProduct[1])}
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
