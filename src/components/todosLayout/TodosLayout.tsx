import { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TodosList from '../todosList/TodosList';

const TodosLayout: FC = () => {
	return (
		<Container>
			<Row>
				<Col>
					<TodosList title='Todos' />
				</Col>
				<Col>
					<TodosList title='In Progress' />
				</Col>
				<Col>
					<TodosList title='Done' />
				</Col>
			</Row>
		</Container>
	)
}

export default TodosLayout;
