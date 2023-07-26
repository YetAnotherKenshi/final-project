import React from 'react';

const SearchBar = ({ searchTerm, onChange }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				id="searchbar"
				value={searchTerm}
				onChange={onChange}
				name="search"
				placeholder="Search..."
				className="search"
			/>
		</form>
	);
};

export default SearchBar;
