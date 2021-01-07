import React from 'react';
import { motion } from 'framer-motion';

function displayNominations(nominations, removeNomination) {
	if (nominations.length > 0) {
		return (
			<ul>
				{nominations.map((movie, index) => (
					<li key={index}>
						{movie.title} ({movie.year})
						<motion.button
              onClick={() => removeNomination(index)}
              
              whileHover={{ scale: 1.1 }}
						>
							REMOVE
						</motion.button>
					</li>
				))}
			</ul>
		);
	}
}

const NominationBox = props => {
	const { nominations, updateNominations } = props;

	const removeNomination = index => {
		const nominee = nominations[index];
		updateNominations(false, nominee);
	};

	return (
		<div className='nomination-box'>
			<div>Nominations</div>
			{displayNominations(nominations, removeNomination)}
		</div>
	);
};

export default NominationBox;