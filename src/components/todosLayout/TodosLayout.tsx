import { IssueType } from "../../common/types/issue";
import TodosList from "../todosList/TodosList";
import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";

const TodosLayout: FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <TodosList type={IssueType.OPEN} />
        </Col>
        <Col>
          <TodosList type={IssueType.INPROGRESS} />
        </Col>
        <Col>
          <TodosList type={IssueType.CLOSED} />
        </Col>
      </Row>
    </Container>
  );
};

export default TodosLayout;
