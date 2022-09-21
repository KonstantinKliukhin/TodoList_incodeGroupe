import { FC } from 'react'
import { Stack } from 'react-bootstrap';
import TodoCard from '../todoCard/TodoCard';

interface ITodosListProps {
	title: string
}

const TodosList: FC<ITodosListProps> = ({title}) => {
	return (
		<div>
			<h3 className='h3 text-center'>{title}</h3>
			<Stack 
				style={{ height: '500px' }} 
				className="p-3 border border-3 border-primary bg-secondary rounded"
				gap={2}
			>
				<TodoCard/>
				<TodoCard/>
			</Stack>
		</div>
	)
}

export default TodosList;
