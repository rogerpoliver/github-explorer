// Modulos
import React, { useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

// Server Code
import api from '../../services/api';

// Componentes
import { Header, RepositoryInfo, Issues } from './styles';

// Assets
import logoImg from '../../assets/logo.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface RepositoryParams {
	repository: string;
}

const Repository: React.FC = () => {
	// Utiliza o useRouteMatch para pegar os parametros da rota
	const { params } = useRouteMatch<RepositoryParams>();
	return (
		<>
			<Header>
				<img src={logoImg} alt="Github Explorer" />
				<Link to="/">
					<FiChevronLeft size={16} />
					Voltar
				</Link>
			</Header>
			<RepositoryInfo>
				<header>
					<img
						src="https://avatars3.githubusercontent.com/u/30274518?s=460&u=b332aaee380877aaf48c66e1ef220588e46d9c7b&v=4"
						alt="Teste"
					/>
					<div>
						<strong>Teste Nome</strong>
						<p>Teste description</p>
					</div>
				</header>
				<ul>
					<li>
						<strong>Teste 1</strong>
						<span>123</span>
					</li>
					<li>
						<strong>Teste 2</strong>
						<span>456</span>
					</li>
					<li>
						<strong>Teste 4</strong>
						<span>789</span>
					</li>
				</ul>
			</RepositoryInfo>
			<Issues>
				<Link to={'/teste'}>
					<div>
						<strong>Teste</strong>
						<p>Teste</p>
					</div>
					<FiChevronRight size={20} />
				</Link>
			</Issues>
		</>
	);
};

export default Repository;
