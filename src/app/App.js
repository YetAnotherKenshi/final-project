import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppLoader from './components/ui/hoc/appLoader';
import NavBar from './components/ui/navBar/navBar';
import AdminPanel from './layouts/adminPanel';
import Auth from './layouts/auth';
import Cart from './layouts/cart';
import LogOut from './layouts/logOut';
import Main from './layouts/main';
import Shop from './layouts/shop';

function App() {
	return (
		<div className="bg-neutral-100 h-max min-h-screen absolute w-full">
			<AppLoader>
				<NavBar />
				<div className="xl:max-w-screen-xl lg:max-w-screen-lg mx-auto">
					<Switch>
						<Route exact path="/" component={Main} />
						<Route path="/shop/:productId?/:edit?" component={Shop} />
						<Route path="/admin" component={AdminPanel} />
						<Route path="/auth" component={Auth} />
						<Route path="/logout" component={LogOut} />
						<Route path="/cart" component={Cart} />
					</Switch>
				</div>
			</AppLoader>
		</div>
	);
}

export default App;
