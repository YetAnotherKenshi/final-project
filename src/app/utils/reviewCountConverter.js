export function convertReviewCount(reviewCount) {
	switch (reviewCount) {
		case 1:
			return '1 отзыв';
		case 2:
			return '2 отзыва';
		case 3:
			return '3 отзыва';
		case 4:
			return '4 отзыва';
		default:
			return `${reviewCount} отзывов`;
	}
}
