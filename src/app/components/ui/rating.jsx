import React from 'react';
import { Star } from '../../utils/icons';

const Rating = ({ rate, max }) => {
	const fullStars = Array(Math.round(rate)).fill(0);
	const emptyStars = Array(max - fullStars.length).fill(0);
	return (
		<div className="flex">
			{fullStars.map((s) => (
				<Star fill={true} />
			))}
			{emptyStars.map((s) => (
				<Star fill={false} />
			))}
		</div>
	);
};

export default Rating;
