import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getIsLoggedIn } from "../../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const history = useHistory();
  const handleClick = () => {
    history.push("/auth/login");
  };
  return (
    <div className="drop-shadow-xl h-20 w-full bg-gradient-to-r from-blue-50 via-white to-purple-50">
      <div className="xl:max-w-screen-xl lg:max-w-screen-lg mx-auto flex justify-between items-center h-full">
        <Link to="/">
          <p className="text-4xl">esports shop</p>
        </Link>
        {isLoggedIn ? (
          <div className="flex items-center">
            <Link to="/admin" className="mr-8">
              Админ-панель
            </Link>
            <Link to="/cart" className="mr-8">
              Корзина
            </Link>
            <NavProfile />
          </div>
        ) : (
          <button
            className="bg-purple-500 w-32 h-2/3 rounded-md text-white"
            onClick={handleClick}
          >
            Войти
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
