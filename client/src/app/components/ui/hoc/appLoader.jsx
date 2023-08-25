import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrder } from "../../../store/orders";
import {
  getProductsLoadingStatus,
  loadProductsList,
} from "../../../store/products";
import { getIsLoggedIn, loadUsersList } from "../../../store/users";
import { loadTypesList } from "../../../store/types";
import { loadBrandsList } from "../../../store/brands";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const productsStatus = useSelector(getProductsLoadingStatus());
  useEffect(() => {
    dispatch(loadProductsList());
    dispatch(loadUsersList());
    dispatch(loadTypesList());
    dispatch(loadBrandsList());
    if (isLoggedIn) {
      dispatch(loadOrder());
    }
  }, [isLoggedIn]);
  if (productsStatus) return "Loading...";
  return children;
};

export default AppLoader;
