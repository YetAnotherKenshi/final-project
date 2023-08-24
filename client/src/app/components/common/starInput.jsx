import React from 'react';
import { Star } from '../../utils/icons';

const StarInput = ({ value, onChange }) => {
	const handleClick = ({ target }) => {
		if (target.type === 'radio') {
			onChange({ name: target.name, value: target.value });
		}
	};
	return (
		<div className="mt-4 ml-4">
			<p>Оценка</p>
			<fieldset class="flex h-max mt-2" onClick={handleClick}>
				{Array(5)
					.fill(0)
					.map((s, i) => (
						<>
							<input
								type="radio"
								name="rating"
								id={`star${i + 1}`}
								value={i + 1}
								className="hidden"
							/>
							<label htmlFor={`star${i + 1}`}>
								<Star fill={value >= i + 1} scale={12} />
							</label>
						</>
					))}
			</fieldset>
		</div>
	);
};

export default StarInput;
