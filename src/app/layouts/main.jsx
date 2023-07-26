import React from 'react';
import { Link } from 'react-router-dom';
import devices from '../hero_V6.png';

const Main = () => {
	return (
		<>
			<div className="2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-lg mx-auto">
				<div className="top-0 w-full absolute flex mt-16">
					<p className="text-5xl">esports shop</p>
					<nav className="flex items-center">
						<ul className="flex ml-12 gap-10 text-lg pt-3">
							<li>Something</li>
							<li>About us</li>
							<li>More</li>
						</ul>
					</nav>
				</div>
				<div className="main-hero">
					<div>
						<h1 className="text-4xl mb-4">
							Все товары для геймеров теперь <br /> в одном месте
						</h1>
						<h3 className="text-xl mb-4 text-gray-600">
							Найди свой идеальный сетап!
						</h3>
						<Link to="/shop">
							<button className="w-48 h-16 rounded-md bg-purple-500 text-white">
								Искать
							</button>
						</Link>
					</div>
					<img src={devices} alt="" className="devices" />
				</div>
			</div>
		</>
	);
};

export default Main;
