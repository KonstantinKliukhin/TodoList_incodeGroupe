import { FC } from 'react'
import { Col } from 'react-bootstrap'
import TodosList from '../todosList/TodosList';

const TodosLayout: FC = () => {
	return (
		<>
			<Col>
				<TodosList title='Todos' />
			</Col>
			<Col>
				<TodosList title='In Progress' />
			</Col>
			<Col>
				<TodosList title='Done'/>
			</Col>
		</>
	)
}

export default TodosLayout;
