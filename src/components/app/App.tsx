import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import RepoRating from '../repoRating/RepoRating';
import TodosLayout from '../todosLayout/TodosLayout';
import TodoUrlInput from '../todoUrlInput/TodoUrlInput';
import TodoBreadCrumb from './../todoBreadcrumb/TodoBreadCrumb';

const App: FC = () => {
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
			<Row  className='mt-3'>
				<TodosLayout/>
			</Row>
		</Container>
	)
}

export default App;
