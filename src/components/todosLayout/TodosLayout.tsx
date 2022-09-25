import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TodosList from "../todosList/TodosList";
import {
  allTodosSelector,
  openedTodosSelector,
  closedTodosSelector,
} from "./../../redux/selectors/todosSelectors";

const TodosLayout: FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <TodosList todosSelector={allTodosSelector} title="Todos" />
        </Col>
        <Col>
          <TodosList todosSelector={openedTodosSelector} title="In Progress" />
        </Col>
        <Col>
          <TodosList todosSelector={closedTodosSelector} title="Done" />
        </Col>
      </Row>
    </Container>
  );
};

export default TodosLayout;
