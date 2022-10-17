import { Component } from 'react'
import { Alert } from 'react-bootstrap'

import { AnyReactElement } from '../../types/reactElements'

interface IErrorBoundaryProps {
  children: AnyReactElement
}

interface IErrorBoundaryState {
  error: boolean
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  state = {
    error: false,
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error(error, errorInfo)

    this.setState({ error: true })
  }

  render() {
    if (this.state.error) {
      return (
        <Alert variant='danger' data-testid='error'>
          Error!
        </Alert>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
