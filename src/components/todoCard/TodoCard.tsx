import { FC } from 'react'
import { Card } from 'react-bootstrap';

const TodoCard: FC = () => {
	return (
		<Card draggable>
			<Card.Body>
				<Card.Title>Some issue Title</Card.Title>
				<Card.Text>#315 opened 3days ago</Card.Text>
				<Card.Text>Admin | Comments: 3</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default TodoCard;
