import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import RepoRating from "../repoRating/RepoRating";
import TodosLayout from "../todosLayout/TodosLayout";
import TodoURLInput from "../todoURLInput/TodoURLInput";
import TodoBreadCrumb from "./../todoBreadcrumb/TodoBreadCrumb";

const App: FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <TodoURLInput />
        </Col>
      </Row>
      <Row xs="auto" className="my-4">
        <Col>
          <TodoBreadCrumb />
        </Col>
        <Col>
          <RepoRating />
        </Col>
      </Row>
      <Row>
        <Col>
          <TodosLayout />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
