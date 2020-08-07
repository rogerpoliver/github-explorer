// Modulos
import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';

// Componentes
import { Title, Form, Repositories, Error } from './styles';

// Assets
import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

// Server Code
import api from '../../services/api';

interface Repository {
	//Tipar somente as informações que você vai utlizar.
	full_name: string;
	description: string;
	owner: {
		login: string;
		avatar_url: string;
	};
}

const Dashboard: React.FC = () => {
	const [newRepo, setNewRepo] = useState('');
	const [inputError, setInputError] = useState('');
	const [repositories, setRepositories] = useState<Repository[]>(() => {
		const storagedRepositories = localStorage.getItem(
			'@GithubExplorer:repositories',
		);

		if (storagedRepositories) {
			return JSON.parse(storagedRepositories);
		}
		return [];
	});

	// Dispara uma função sempre que o repositories tiver alteração
	useEffect(() => {
		localStorage.setItem(
			'@GithubExplorer:repositories',
			JSON.stringify(repositories),
		);
	}, [repositories]);

	async function handleAddRepository(
		event: FormEvent<HTMLFormElement>,
	): Promise<void> {
		event.preventDefault();

		// Verifica se o input está vazio
		if (!newRepo) {
			setInputError('Choose a valid author/repository');
			return;
		}

		try {
			const response = await api.get<Repository>(`repos/${newRepo}`);
			const repository = response.data;
			setRepositories([...repositories, repository]);
			// Limpa o input
			setNewRepo('');
			// Limpa a mensagem de erro
			setInputError('');
		} catch (error) {
			setInputError('Error on repository search...');
		}
	}

	return (
		<>
			<Link to="/">
				<img src={logoImg} alt="Github Explorer" />
			</Link>

			<Title>Explore Github repositories</Title>

			{/* "!!" representa Truthy / Falsy */}
			<Form hasError={!!inputError} onSubmit={handleAddRepository}>
				<input
					value={newRepo}
					onChange={e => setNewRepo(e.target.value)}
					placeholder="Search the repository here..."
				/>
				<button type="submit">Search</button>
			</Form>

			{/* Só exibe o componente se inputError for true */}
			{inputError && <Error>{inputError}</Error>}

			<Repositories>
				{repositories.map(repository => (
					<Link
						key={repository.full_name}
						to={`/repository/${repository.full_name}`}
					>
						<img
							src={repository.owner.avatar_url}
							alt={repository.owner.login}
						/>
						<div>
							<strong>{repository.full_name}</strong>
							<p>{repository.description}</p>
						</div>
						<FiChevronRight size={20} />
					</Link>
				))}
			</Repositories>
		</>
	);
};

export default Dashboard;
