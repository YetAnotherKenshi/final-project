import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { removeOrder, getOrders } from "../../../store/orders";
import { getProductsByIds, updateProduct } from "../../../store/products";
import { convertPrice } from "../../../utils/priceConverter";
import BackHistoryButton from "../../common/backButton";
import CartProductCard from "../../ui/cartProductCard";

const CartPage = () => {
  const currentOrder = useSelector(getOrders());
  const history = useHistory();
  const dispatch = useDispatch();
  const products = useSelector(getProductsByIds(currentOrder.map((i) => i[0])));
  const price = products.map((p) => Number(p.price));
  const countPrice = () => {
    let init = 0;
    for (let i = 0; i < currentOrder.length; i++) {
      init += price[i] * currentOrder[i][1];
    }
    return init;
  };
  const decreaseValue = (order) => {
    const product = products.find((p) => p._id === order[0]);
    const newProduct = { ...product, quantity: product.quantity - order[1] };
    dispatch(updateProduct(newProduct));
  };

  const handleClick = () => {
    currentOrder.map((p) => decreaseValue(p));
    dispatch(removeOrder());
    history.push("/cart/checkout");
  };
  return (
    <>
      <BackHistoryButton />
      <h2 className="text-4xl mt-4">Корзина</h2>
      <div className="w-full grid grid-cols-3 gap-[15px] mt-4">
        <div className="col-span-2">
          {products.length > 0 ? (
            products.map((p) => <CartProductCard product={p} />)
          ) : (
            <h1 className="text-2xl">
              В корзине нет товаров.
              <Link to="/shop/all" className="font-semibold ml-1">
                Вперёд за покупками!
              </Link>
            </h1>
          )}
        </div>
        {products.length > 0 && (
          <div className="bg-white col-span-1 h-fit py-8 px-8 rounded-md">
            <div className="flex justify-between align-center">
              <p className="text-xl font-semibold">Итого</p>
              <p className="text-xl font-semibold">
                {convertPrice(countPrice())}
              </p>
            </div>
            <button
              className="w-full h-16 bg-purple-500 text-white rounded mt-9"
              onClick={handleClick}
            >
              Перейти к оплате
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default CartPage;
