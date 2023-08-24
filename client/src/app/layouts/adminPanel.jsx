import React from "react";
import { useParams } from "react-router-dom";
import AdminPanelPage from "../components/page/adminPanelPage/adminPanelPage";
import CreateProductPage from "../components/page/createProductPage/createProductPage";

const AdminPanel = () => {
  const params = useParams();
  const { type } = params;
  return <>{type === "create" ? <CreateProductPage /> : <AdminPanelPage />}</>;
};

export default AdminPanel;
