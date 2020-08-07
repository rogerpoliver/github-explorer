// Modulos
import React, { useEffect, useState } from 'react';
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

interface Repository {
	//Tipar somente as informações que você vai utlizar.
	full_name: string;
	description: string;
	owner: {
		login: string;
		avatar_url: string;
	};
	stargazers_count: number;
	open_issues_count: number;
	forks_count: number;
}

interface Issue {
	id: number;
	title: string;
	user: {
		login: string;
	};
	html_url: string;
}

const Repository: React.FC = () => {
	const [repository, setRepository] = useState<Repository | null>(null);
	const [issues, setIssues] = useState<Issue[]>([]);

	// Utiliza o useRouteMatch para pegar os parametros da rota
	const { params } = useRouteMatch<RepositoryParams>();

	// Faz a resquest para obter os dados
	useEffect(() => {
		async function loadData(): Promise<void> {
			const [repository, issues] = await Promise.all([
				api.get(`repos/${params.repository}`),
				api.get(`repos/${params.repository}/issues`),
			]);
			setRepository(repository.data);
			setIssues(issues.data);
		}
		loadData();
	}, [params.repository]);

	return (
		<>
			<Header>
				<Link to="/">
					<img src={logoImg} alt="Github Explorer" />
				</Link>
				<Link to="/">
					<FiChevronLeft size={16} />
					Voltar
				</Link>
			</Header>
			{/* IF repository existe, mostra os dados */}
			{repository && (
				<RepositoryInfo>
					<header>
						<img
							src={repository.owner.avatar_url}
							alt={repository.owner.login}
						/>
						<div>
							<strong>{repository.full_name}</strong>
							<p>{repository.description}</p>
						</div>
					</header>
					<ul>
						<li>
							<strong>{repository.stargazers_count}</strong>
							<span>Stars</span>
						</li>
						<li>
							<strong>{repository.forks_count}</strong>
							<span>Forks</span>
						</li>
						<li>
							<strong>{repository.open_issues_count}</strong>
							<span>Issues Abertas</span>
						</li>
					</ul>
				</RepositoryInfo>
			)}

			<Issues>
				{issues.map(issue => (
					<a key={issue.id} href={issue.html_url}>
						<div>
							<strong>{issue.title}</strong>
							<p>{issue.user.login}</p>
						</div>
						<FiChevronRight size={20} />
					</a>
				))}
			</Issues>
		</>
	);
};

export default Repository;
