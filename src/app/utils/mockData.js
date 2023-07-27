import { useEffect, useState } from 'react';
import products from '../mockData/products.json';
import httpService from '../services/http.service';

const useMockData = () => {
	const statusConsts = {
		idle: 'Not started',
		pending: 'In progress',
		success: 'Ready',
		error: 'Error occured',
	};
	const [error, setError] = useState(null);
	const [status, setStatus] = useState(statusConsts.idle);
	const [progress, setProgress] = useState(0);
	const [count, setCount] = useState(0);
	const summaryCount = products.length;
	const incrementCount = () => {
		setCount((prevState) => prevState + 1);
	};
	const updateProgress = () => {
		if (count !== 0 && status === statusConsts.idle) {
			setStatus(statusConsts.pending);
		}
		const newProgress = Math.floor((count / summaryCount) * 100);
		if (progress < newProgress) {
			setProgress(() => newProgress);
		}
		if (newProgress === 100) {
			setStatus(statusConsts.success);
		}
	};
	useEffect(() => {
		updateProgress();
	}, [count]);
	async function initialize() {
		try {
			for (const prod of products) {
				await httpService.put('product/' + prod._id, prod);
				incrementCount();
			}
		} catch (error) {
			setError(error);
			setStatus(statusConsts.error);
		}
	}
	return { error, initialize, progress, status };
};

export default useMockData;
