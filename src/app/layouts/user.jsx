import React from "react";
import UserPage from "../components/page/userPage/userPage";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import EditUserPage from "../components/page/editUserPage.jsx/editUserPage";

const User = () => {
  const { edit } = useParams();
  return <>{edit ? <EditUserPage /> : <UserPage />}</>;
};

export default User;
