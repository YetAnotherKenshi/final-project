import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getComments, loadCommentsByUser } from "../../../store/comments";
import { getProducts } from "../../../store/products";
import { getCurrentUserData } from "../../../store/users";
import BackHistoryButton from "../../common/backButton";
import Rating from "../../ui/rating";
import { Link } from "react-router-dom";
import { convertReviewCount } from "../../../utils/reviewCountConverter";

const UserPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserData());
  const comments = useSelector(getComments());
  const products = useSelector(getProducts());
  useEffect(() => {
    dispatch(loadCommentsByUser(currentUser._id));
    console.log(comments);
  }, []);
  return (
    <div>
      <BackHistoryButton />
      <p className="text-4xl mt-4">Мой профиль</p>
      {currentUser && (
        <div className="">
          <div className="grid grid-cols-12 mt-4 gap-4">
            <div className="col-span-3 bg-white p-8 rounded">
              <Link to="/user/edit">
                <img src={currentUser.image} alt="" />
              </Link>
            </div>
            <div className="col-span-9 bg-white p-8 rounded">
              <p className="text-3xl">{currentUser.name}</p>
              <p className="text-2xl mt-4 text-neutral-600">
                {currentUser.about}
              </p>
              <p className="text-2xl mt-4">
                На сайте с{" "}
                {new Date(currentUser.createdAt).toLocaleDateString("ru", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-2xl mt-2">
                {convertReviewCount(comments.length)}
              </p>
              <p className="text-2xl mt-2 text-neutral-600">
                {currentUser?.email}
              </p>
              <p className="text-2xl mt-2 text-neutral-600">
                {currentUser?.phone}
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded mt-4">
            <p className="text-2xl mb-4">Оставленные отзывы</p>
            {comments.length > 0 ? (
              comments.map((c) => {
                const product = products.find((p) => p._id === c.productId);
                return (
                  <div className="bg-neutral-100 h-32 h-fit p-8 mb-2 rounded">
                    <div className="flex items-center mb-2">
                      <p className="text-2xl mr-2">{product.name}</p>
                      <Rating rate={c.rating} max={5} />
                    </div>
                    <p className="text-md">{c.text}</p>
                  </div>
                );
              })
            ) : (
              <div className="bg-neutral-100 h-32 h-fit p-8 mb-2 rounded">
                <p className="text-2xl mr-2">Вы ещё не оставили отзывов</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
