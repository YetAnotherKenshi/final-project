import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getIsLoggedIn } from '../../../store/users';
import NavProfile from './navProfile';

const NavBar = () => {
	const isLoggedIn = useSelector(getIsLoggedIn());
	const history = useHistory();
	const handleClick = () => {
		history.push('/auth/login');
	};
	return (
		<div className="border-b-2 drop-shadow-md h-20 w-full">
			<div className="xl:max-w-screen-xl lg:max-w-screen-lg mx-auto flex justify-between items-center h-full">
				<div className=""></div>
				{isLoggedIn ? (
					<NavProfile />
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
