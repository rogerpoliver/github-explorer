import React, { useState, FormEvent } from 'react';
import api from '../../services/api';
import logo from '../../assets/logo.svg';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories, Error } from './styles';

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
	const [repositories, setRepositories] = useState<Repository[]>([]);

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
			<img src={logo} alt="GitHub Explorer"></img>

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
					<a key={repository.full_name} href="teste">
						<img
							src={repository.owner.avatar_url}
							alt={repository.owner.login}
						/>
						<div>
							<strong>{repository.full_name}</strong>
							<p>{repository.description}</p>
						</div>
						<FiChevronRight size={20} />
					</a>
				))}
			</Repositories>
		</>
	);
};

export default Dashboard;
