import { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import TodoBreadCrumb from '../repoLinks/repoLinks'
import RepoRating from '../repoRating/RepoRating'
import TodoURLInput from '../todoURLInput/TodoURLInput'
import TodosLayout from '../todosLayout/TodosLayout'

const App: FC = () => {
  return (
    <Container data-testid='app-container'>
      <Row>
        <Col>
          <ErrorBoundary>
            <TodoURLInput />
          </ErrorBoundary>
        </Col>
      </Row>
      <Row xs='auto' className='my-4'>
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
  )
}

export default App
