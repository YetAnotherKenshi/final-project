import { Star } from './icons';

export function getRating(rating, max) {
	const fullStars = Math.floor(rating);
	const emptyStars = max - fullStars;
	return (
		<div>
			{fullStars.map((s) => (
				<Star fill={true} />
			))}
			{emptyStars.map((s) => (
				<Star fill={false} />
			))}
		</div>
	);
}
