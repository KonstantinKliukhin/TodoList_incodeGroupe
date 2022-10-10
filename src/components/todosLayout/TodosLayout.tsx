import { IssueState } from "../../types/issue";
import TodosList from "../todosList/TodosList";
import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";

const TodosLayout: FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <TodosList type={IssueState.OPEN} />
        </Col>
        <Col>
          <TodosList type={IssueState.INPROGRESS} />
        </Col>
        <Col>
          <TodosList type={IssueState.CLOSED} />
        </Col>
      </Row>
    </Container>
  );
};

export default TodosLayout;
