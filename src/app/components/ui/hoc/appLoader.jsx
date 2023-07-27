import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart } from '../../../store/cart';
import {
	getProductsLoadingStatus,
	loadProductsList,
} from '../../../store/products';
import { getIsLoggedIn, loadUsersList } from '../../../store/users';

const AppLoader = ({ children }) => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(getIsLoggedIn());
	const productsStatus = useSelector(getProductsLoadingStatus());
	useEffect(() => {
		dispatch(loadProductsList());
		if (isLoggedIn) {
			dispatch(loadUsersList());
			dispatch(loadCart());
		}
	}, [isLoggedIn]);
	if (productsStatus) return 'Loading...';
	return children;
};

export default AppLoader;
