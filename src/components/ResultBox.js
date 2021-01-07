import React from 'react';
import { motion } from 'framer-motion';

function displayMovies(data, clickHandler, nominations) {
	if (data) {
		return (
			<ul>
				{data.map((movie, index) => (
					<li key={index}>
						{movie.title} ({movie.year})
						<NominateButton
							index={index}
							isNomination={checkIfNominee(
								movie.title,
								movie.year,
								nominations
							)}
							clickHandler={clickHandler}
						/>
					</li>
				))}
			</ul>
		);
	}
}

function checkIfNominee(title, year, nominations) {
	return nominations.some(
		nominee => nominee.title === title && nominee.year === year
	);
}

const ResultBox = props => {
	const {
		searchBarText,
		movieResults,
		errorMessage,
		updateNominations,
		nominations,
	} = props;

	const clickHandler = (event, movieIndex) => {
		const movie = movieResults[movieIndex];
		event.target.disabled = true;
		updateNominations(true, movie, nominations);
	};
	return (
		<div className='result-box'>
			<div>Results for "{searchBarText}"</div>
			{errorMessage
				? errorMessage
				: displayMovies(movieResults, clickHandler, nominations)}
		</div>
	);
};

const NominateButton = props => {
	const { index, isNomination, clickHandler } = props;
	if (isNomination) {
		return (
			<button
				onClick={e => clickHandler(e, index)}
				disabled={true}
			>
				NOMINATE
			</button>
		);
	} else {
		return (
			<motion.button
				onClick={e => clickHandler(e, index)}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
			>
				NOMINATE
			</motion.button>
		);
	}
};

export default ResultBox;
