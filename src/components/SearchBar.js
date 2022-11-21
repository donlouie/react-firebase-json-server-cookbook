import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//* styles
import './SearchBar.css';

import React from 'react';

const SearchBar = () => {
	const [term, setTerm] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		navigate(`/search?q=${term}`);
	};

	return (
		<div className="searchbar">
			<form onSubmit={handleSubmit}>
				<label htmlFor="search">Search:</label>
				<input
					className="searchBar"
					type="text"
					id="search"
					onChange={(e) => setTerm(e.target.value)}
				/>
			</form>
		</div>
	);
};

export default SearchBar;
