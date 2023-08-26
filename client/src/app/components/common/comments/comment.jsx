import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUserById } from "../../../store/users";
import { displayDate } from "../../../utils/displayDate";
import Rating from "../../ui/rating";
import { Cross } from "../../../utils/icons";

const Comment = ({
  text,
  rating,
  userId,
  created_at: createTime,
  onRemove,
  _id: id,
}) => {
  const user = useSelector(getUserById(userId));
  const currentUserId = useSelector(getCurrentUserId());
  console.log(userId, currentUserId);
  return (
    <div className="bg-gradient-to-r from-blue-50 via-neutral-100 to-purple-50 py-8 px-12 mt-4 rounded-md">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-2xl">{user.name} </p>
            <Rating rate={rating} max={5} />
          </div>
          <p className="text-md">{displayDate(createTime)}</p>
          <p className="mt-4 text-lg">{text}</p>
        </div>
        {currentUserId === userId && (
          <button onClick={() => onRemove(id)}>
            <Cross />
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
