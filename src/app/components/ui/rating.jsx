import React from 'react';
import star from '../../star.png';

const Rating = ({ rate }) => {
	const coloredStars = Array(Math.round(rate)).fill(0);
	const uncoloredStars = Array(5 - Math.round(rate)).fill(0);
	return (
		<div className="flex gap-[4px] h-4">
			{coloredStars.map((i) => (
				<i
					className="h-4 w-4 bg-cover"
					style={{
						backgroundImage: `url(${star})`,
					}}
				></i>
			))}
			{uncoloredStars.map((i) => (
				<i
					className="h-4 w-4 bg-cover"
					style={{
						backgroundImage: `url(${star})`,
						filter: 'saturate(0)',
					}}
				></i>
			))}
		</div>
	);
};

export default Rating;
