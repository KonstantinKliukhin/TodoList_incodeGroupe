import { FC, DragEventHandler } from 'react'
import { Card } from 'react-bootstrap';

const TodoCard: FC = () => {

	// const dragStartHandler: DragEventHandler<HTMLDivElement> = (e) => {

	// }

	// const dragLeaveHandler: DragEventHandler<HTMLDivElement> = (e) => {

	// }

	// const dragEndHandler: DragEventHandler<HTMLDivElement> = (e) => {

	// }

	const dragOverHandler: DragEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault();
	}

	const dropHandler: DragEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault();
	}


	return (
		<Card 
			// draggable={true}
			// onDragStart={dragStartHandler}
			// onDragLeave={dragLeaveHandler}
			// onDragEnd={dragEndHandler}
			// onDragOver={dragOverHandler}
			// onDrop={dropHandler}
		>
			<Card.Body>
				<Card.Title>Some issue Title</Card.Title>
				<Card.Text>#315 opened 3days ago</Card.Text>
				<Card.Text>Admin | Comments: 3</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default TodoCard;
