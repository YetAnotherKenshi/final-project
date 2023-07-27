import React, { useState } from 'react';
import TextAreaField from '../form/textAreaField';
import PropTypes from 'prop-types';

const AddCommentForm = ({ onSubmit }) => {
	const [data, setData] = useState({});
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
		onSubmit(data);
		clearForm();
	};
	return (
		<div className="bg-neutral-200 rounded-md p-8 mt-4">
			<p className="text-2xl">Оставьте свой отзыв</p>
			<form onSubmit={handleSubmit} className="flex items-end">
				<TextAreaField
					value={data.content || ''}
					onChange={handleChange}
					name="content"
					label="Сообщение"
				/>
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
