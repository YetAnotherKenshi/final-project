import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUserData } from '../../../store/users';

const NavProfile = () => {
	const currentUser = useSelector(getCurrentUserData());
	const [isOpen, setOpen] = useState(false);
	const toggleMenu = () => {
		setOpen((prevState) => !prevState);
	};
	if (!currentUser) return 'Loading';
	return (
		<>
			<div className="relative">
				<button className="flex items-center" onClick={toggleMenu}>
					<p>{currentUser.name}</p>
					<img src={currentUser.image} alt="" className="ml-2 h-10 w-10" />
				</button>
				{isOpen && (
					<div className="absolute w-[125%] right-0 mt-6 bg-white rounded-md shadow-lg">
						<Link to="/user">
							<button
								className="w-full text-left py-4 px-6 rounded-t-md hover:bg-gray-100"
								onClick={() => setOpen(false)}
							>
								Профиль
							</button>
						</Link>
						<Link to="/logout">
							<button className="w-full text-left py-4 px-6 rounded-b-md hover:bg-gray-100">
								Выйти
							</button>
						</Link>
					</div>
				)}
			</div>
		</>
	);
};

export default NavProfile;
