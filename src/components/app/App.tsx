import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import TodoBreadCrumb from "../repoLinks/repoLinks";
import RepoRating from "../repoRating/RepoRating";
import TodoURLInput from "../todoURLInput/TodoURLInput";
import TodosLayout from "../todosLayout/TodosLayout";
import { FC } from "react";
import { Col, Row, Container } from "react-bootstrap";

const App: FC = () => {
  return (
    <Container data-testid="app-container">
      <Row>
        <Col>
          <ErrorBoundary>
            <TodoURLInput />
          </ErrorBoundary>
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
