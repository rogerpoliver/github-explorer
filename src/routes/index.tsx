import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard/';
import Repository from '../pages/Repository/';

//Switch mostra apenas UMA rota por vez e não todas.

const Routes: React.FC = () => (
	<Switch>
		<Route path="/" exact component={Dashboard} />
		<Route path="/repository" component={Repository} />
	</Switch>
);

export default Routes;
