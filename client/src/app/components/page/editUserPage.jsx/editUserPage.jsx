import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TextField from "../../common/form/textField";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import BackHistoryButton from "../../common/backButton";
import { getCurrentUserData, updateUser } from "../../../store/users";

const EditUserPage = ({ productId }) => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(getCurrentUserData());
  useEffect(() => {
    setData({ ...user });
  }, [user]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(data));
    history.push("/user");
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
              label="Имя"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            <TextField
              label="Номер телефона"
              name="phone"
              value={data.phone}
              onChange={handleChange}
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

export default EditUserPage;
