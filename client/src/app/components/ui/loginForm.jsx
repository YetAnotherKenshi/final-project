import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/users";
import TextField from "../common/form/textField";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : "/";
    dispatch(login({ payload: data, redirect }));
  };
  return (
    <form
      className="bg-white p-16 w-1/2 rounded-xl shadow-lg"
      onSubmit={handleSubmit}
    >
      <TextField
        label="Почта"
        name="email"
        value={data.email}
        onChange={handleChange}
      />
      <TextField
        label="Пароль"
        name="password"
        value={data.password}
        onChange={handleChange}
        type="password"
      />
      <button
        type="submit"
        className="w-full h-12 mt-4 bg-purple-500 rounded text-white"
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
