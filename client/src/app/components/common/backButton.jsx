import React from 'react';
import { useHistory } from 'react-router-dom';
const BackHistoryButton = () => {
	const history = useHistory();
	return (
		<button className="back" onClick={() => history.goBack()}>
			<i></i>назад
		</button>
	);
};

export default BackHistoryButton;
