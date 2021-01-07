import React from 'react';
import './components.css';
import { motion } from 'framer-motion';
import trophy from './trophy.png';

const Banner = props => {
	const { numberOfNominations } = props;

	const variants = {
		open: { x: 0, y: 0, scale: 1, rotate: 360 },
	};

	return (
		<motion.div
			className='banner'
      key='modal'
      initial={{ x: 0, y: 0, scale: 0, rotate: 0 }}
			animate={(numberOfNominations >= 5) ? "open" : {}}
      variants={variants}
		>
			You picked 5 nominations!
			<img
				className='trophy'
				src={trophy}
				alt='Trophy'
				height='60'
				width='40'
			></img>
		</motion.div>
	);
};

export default Banner;
