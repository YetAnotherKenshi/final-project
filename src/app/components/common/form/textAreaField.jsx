import React from 'react';

const TextAreaField = ({ label, name, value, onChange }) => {
	const handleChange = ({ target }) => {
		onChange({ name: target.name, value: target.value });
	};
	return (
		<div className="mt-4">
			<label htmlFor={name}> {label}</label>
			<div className="w-96 h-16 mt-2">
				<textarea
					id={name}
					name={name}
					value={value}
					onChange={handleChange}
					className="bg-white w-full h-full rounded-md resize-none"
				/>
			</div>
		</div>
	);
};
export default TextAreaField;
