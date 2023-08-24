import React from 'react';

const SearchBar = ({ value, onChange, name }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleChange = ({ target }) => {
		onChange({ name: target.name, value: target.value });
	};
	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				id="searchbar"
				value={value}
				onChange={handleChange}
				name={name}
				placeholder="Search..."
				className="search"
			/>
		</form>
	);
};

export default SearchBar;
