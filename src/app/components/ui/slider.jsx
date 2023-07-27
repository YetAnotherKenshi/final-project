import React from 'react';

const Slider = ({ min, max, onChange }) => {
	const handleMin = ({ target }) => {
		if (target.value >= max) {
			onChange({ name: target.name, value: max });
		} else {
			onChange({ name: target.name, value: Number(target.value) });
		}
	};
	const handleMax = ({ target }) => {
		if (target.value <= min) {
			onChange({ name: target.name, value: min });
		} else {
			onChange({ name: target.name, value: Number(target.value) });
		}
	};
	return (
		<div className="relative h-8">
			<div
				className="absolute h-1 w-full bg-purple-700 bottom-0 top-0 m-auto"
				style={{
					background: `linear-gradient(to right, #dadae5 ${
						(min / 20000) * 100
					}% , #6e32a6 ${(min / 20000) * 100}% , #6e32a6 ${
						(max / 20000) * 100
					}%, #dadae5 ${(max / 20000) * 100}%)`,
				}}
			></div>
			<input
				type="range"
				min="0"
				max="20000"
				name="minPrice"
				value={min}
				id="slider-1"
				step="1000"
				onChange={handleMin}
				className="appearance-none absolute bg-transparent w-full bottom-0 top-0 m-auto pointer-events-none	"
			/>
			<input
				type="range"
				min="0"
				max="20000"
				value={max}
				name="maxPrice"
				id="slider-2"
				step="1000"
				onChange={handleMax}
				className="appearance-none absolute bg-transparent w-full bottom-0 top-0 m-auto pointer-events-none	"
			/>
		</div>
	);
};

export default Slider;
