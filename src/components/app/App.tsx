import { FC, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import RepoRating from '../repoRating/RepoRating';
import TodosLayout from '../todosLayout/TodosLayout';
import TodoUrlInput from '../todoUrlInput/TodoUrlInput';
import TodoBreadCrumb from './../todoBreadcrumb/TodoBreadCrumb';

import githubApi from '../../api/githubApi';
import { IssueType } from '../../common/types/issue';

const App: FC = () => {
	useEffect(() => {
		githubApi.getIssues({
			owner: 'facebook',
			repo: 'react',
			state: IssueType.ALL
		}).then((data) => {
			console.log(data);
		})
	});
	return (
		<Container>
			<Row>
				<Col>
					<TodoUrlInput />
				</Col>
			</Row>
			<Row xs='auto'>
				<Col>
					<TodoBreadCrumb />
				</Col>
				<Col>
					<RepoRating />
				</Col>
			</Row>
			<Row>
				<Col>
					<TodosLayout />
				</Col>
			</Row>
		</Container>
	)
}

export default App;
