import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminPanel from './layouts/adminPanel';
import Main from './layouts/main';
import Shop from './layouts/shop';

function App() {
	return (
		<div>
			<Switch>
				<Route path="/" exact component={Main} />
				<Route path="/shop/:productId?" component={Shop} />
				<Route path="/admin" component={AdminPanel} />
			</Switch>
		</div>
	);
}

export default App;
