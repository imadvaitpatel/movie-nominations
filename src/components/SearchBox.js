import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBox = props => {
	const { updateResults } = props;

	const updateInput = event => {
		updateResults(event.target.value);
	};

	return (
		<div className='search-box'>
			<div className='movie-title'>Movie Title</div>
			<div className='search-bar'>
				<input type='text' onInput={updateInput} />
				<FontAwesomeIcon
					icon={faSearch}
					className='search-icon'
					styles='color: blue;'
				/>
			</div>
		</div>
	);
};

export default SearchBox;