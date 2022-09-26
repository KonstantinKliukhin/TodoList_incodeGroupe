import { FC, DragEventHandler } from "react";
import { Card } from "react-bootstrap";
import { IIssue } from "../../common/types/issue";
import getCardTimeText from "./getCardTime";

interface TodoCardProps {
  todo: IIssue;
}

const TodoCard: FC<TodoCardProps> = ({ todo }) => {
  // const dragStartHandler: DragEventHandler<HTMLDivElement> = (e) => {

  // }

  // const dragLeaveHandler: DragEventHandler<HTMLDivElement> = (e) => {

  // }

  // const dragEndHandler: DragEventHandler<HTMLDivElement> = (e) => {

  // }

  const dragOverHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const dropHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const cardTimeText = getCardTimeText(todo);

  return (
    <Card
      draggable={true}
      // onDragStart={dragStartHandler}
      // onDragLeave={dragLeaveHandler}
      // onDragEnd={dragEndHandler}
      // onDragOver={dragOverHandler}
      // onDrop={dropHandler}
    >
      <Card.Body>
        <Card.Title>{todo.title}</Card.Title>
        <Card.Text>
          #{todo.number} {cardTimeText}
        </Card.Text>
        <Card.Text>
          {todo.user.name} | Comments: {todo.commentsNumber}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TodoCard;
