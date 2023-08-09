import React, { useState } from 'react';
import TextAreaField from '../form/textAreaField';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../../store/users';
import { useHistory } from 'react-router-dom';
import StarInput from '../starInput';

const AddCommentForm = ({ onSubmit }) => {
	const [data, setData] = useState({});
	const isLoggedIn = useSelector(getIsLoggedIn());
	const history = useHistory();
	const handleChange = (target) => {
		setData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};

	const clearForm = () => {
		setData({});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (isLoggedIn) {
			onSubmit(data);
			clearForm();
		} else {
			history.push('/auth/login');
		}
	};
	return (
		<div className="bg-gradient-to-r from-blue-50 via-neutral-100 to-purple-50 rounded-md py-8 px-12 mt-4">
			<p className="text-2xl">Оставьте свой отзыв</p>
			<form onSubmit={handleSubmit} className="flex items-end justify-between">
				<div className="flex items-start">
					<TextAreaField
						value={data.text || ''}
						onChange={handleChange}
						name="text"
						label="Сообщение"
					/>
					<StarInput value={data.rating} onChange={handleChange} />
				</div>
				<div className="">
					<button className="ml-8 w-40 h-16 bg-purple-500 rounded-md text-white">
						Опубликовать
					</button>
				</div>
			</form>
		</div>
	);
};
AddCommentForm.propTypes = {
	onSubmit: PropTypes.func,
};

export default AddCommentForm;
