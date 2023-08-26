import React from "react";
import { useParams } from "react-router-dom";
import AdminPanelPage from "../components/page/adminPanelPage/adminPanelPage";
import CreateProductPage from "../components/page/createProductPage/createProductPage";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../store/users";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const AdminPanel = () => {
  const params = useParams();
  const currentUser = useSelector(getCurrentUserData());
  const { type } = params;
  return (
    <>
      {currentUser.status === "admin" ? (
        type === "create" ? (
          <CreateProductPage />
        ) : (
          <AdminPanelPage />
        )
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )}
    </>
  );
};

export default AdminPanel;
