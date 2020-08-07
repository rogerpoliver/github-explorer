// Modulos
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Componentes
import Dashboard from '../pages/Dashboard/';
import Repository from '../pages/Repository/';

//Switch mostra apenas UMA rota por vez e não todas.

const Routes: React.FC = () => (
	<Switch>
		<Route path="/" exact component={Dashboard} />
		{/* ":repository" é o parametro recebido.
		"+" significa que tudo é parte do param, pode usar barras na string "/" */}
		<Route path="/repository/:repository+" component={Repository} />
	</Switch>
);

export default Routes;
