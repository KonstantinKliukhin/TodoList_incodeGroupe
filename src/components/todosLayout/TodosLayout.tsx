import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TodosList from "../todosList/TodosList";
import {
  allIssuesSelector,
  openedIssuesSelector,
  closedIssuesSelector,
} from "./../../redux/selectors/todosSelectors";

const TodosLayout: FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <TodosList todosSelector={allIssuesSelector} title="Todos" />
        </Col>
        <Col>
          <TodosList todosSelector={openedIssuesSelector} title="In Progress" />
        </Col>
        <Col>
          <TodosList todosSelector={closedIssuesSelector} title="Done" />
        </Col>
      </Row>
    </Container>
  );
};

export default TodosLayout;
