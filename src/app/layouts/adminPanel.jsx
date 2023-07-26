import React from 'react';
import BackHistoryButton from '../components/common/backButton';

const AdminPanel = () => {
	return (
		<div className="block">
			<div className="shop-container">
				<BackHistoryButton />
				<>
					<div className="category">
						<h2 className="text-4xl">Админ панель</h2>
					</div>
					<div className="grid grid-cols-10 mt-3">
						<div className="col-span-3">
							<div className="flex w-96 h-96 bg-white rounded-lg justify-center items-center"></div>
						</div>
						<div className="col-end-11 col-span-3 bg-white h-48 rounded-lg p-4">
							<p className="text-2xl">1</p>
							<button className="bg-purple-500 p-4 w-full h-16  text-white rounded-md mt-2">
								Купить
							</button>
						</div>
					</div>
				</>
			</div>
		</div>
	);
};

export default AdminPanel;
