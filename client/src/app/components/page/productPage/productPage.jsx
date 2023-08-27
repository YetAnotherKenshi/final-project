import React from "react";
import { convertPrice } from "../../../utils/priceConverter";
import BackHistoryButton from "../../common/backButton";
import Rating from "../../ui/rating";
import settings from "../../../setting.png";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductById } from "../../../store/products";
import Comments from "../../ui/comments";
import { getComments } from "../../../store/comments";
import { convertReviewCount } from "../../../utils/reviewCountConverter";
import ProductAddButton from "../../ui/productAddButton";
import { getCurrentUserData } from "../../../store/users";

const ProductPage = ({ productId }) => {
  const product = useSelector(getProductById(productId));
  const comments = useSelector(getComments());
  const currentUser = useSelector(getCurrentUserData()) || null;
  const history = useHistory();
  const handleClick = () => {
    history.push(history.location.pathname + "/edit");
  };
  return (
    <>
      <BackHistoryButton />
      {product ? (
        <>
          <div className="flex items-center mt-4 mb-4">
            <h2 className="text-4xl">{product.name}</h2>
            {currentUser?.status === "admin" && (
              <button
                className="ml-2 h-6 w-6 bg-cover"
                style={{
                  backgroundImage: `url(${settings})`,
                }}
                onClick={handleClick}
              ></button>
            )}
          </div>
          <div className="flex items-center">
            <Rating rate={product.rate} max={5} />
            <p className="ml-2">{convertReviewCount(comments.length)}</p>
          </div>
          <div className="grid grid-cols-10 mt-3 gap-8">
            <div className="col-span-3">
              <div className="flex w-full h-96 bg-white rounded-lg justify-center items-center">
                <img src={product.url} className="w-72 h-72 object-contain" />
              </div>
            </div>
            <div className="col-span-3">
              <p
                className={`text-lg ${
                  product.quantity > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.quantity > 0
                  ? `В наличии: ${product.quantity}шт`
                  : "Нет в наличии"}
              </p>
            </div>
            <div className="col-end-11 col-span-3 bg-white h-fit rounded-lg p-4">
              <p className="text-2xl">{convertPrice(product.price)}</p>
              <ProductAddButton product={product} full={true} />
            </div>
          </div>
          <Comments />
        </>
      ) : (
        <>
          <div className="animate-pulse w-80 h-8 mt-6 bg-slate-300 rounded-md"></div>
          <div className="animate-pulse w-48 h-4 mt-7 bg-slate-300 rounded"></div>
          <div className="grid grid-cols-10 mt-3">
            <div className="col-span-3">
              <div className="animate-pulse w-96 h-96 bg-slate-300 rounded-lg"></div>
            </div>
            <div className="col-span-3">
              <div className="animate-pulse ml-4 w-32 h-6 bg-slate-300 rounded"></div>
            </div>
            <div className="col-end-11 col-span-3">
              <div className="animate-pulse bg-slate-300 h-48 rounded-lg"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductPage;
