import React from 'react';
import { motion } from 'framer-motion';
import sound from '../assets/remove-sound.mp3';

const audio = new Audio(sound);

function displayNominations(nominations, removeNomination) {
	if (nominations.length > 0) {
		return (
			<ul>
				{nominations.map((movie, index) => (
					<motion.li
						key={index}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						{movie.title} ({movie.year})
						<motion.button
							onClick={() => removeNomination(index)}
							whileHover={{ scale: 1.1 }}
						>
							REMOVE
						</motion.button>
					</motion.li>
				))}
			</ul>
		);
	}
}

const NominationBox = props => {
	const { nominations, updateNominations } = props;

	const removeNomination = index => {
    audio.play();
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
