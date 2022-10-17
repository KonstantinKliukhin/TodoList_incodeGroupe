import { Alert, Spinner } from 'react-bootstrap'

import { Loading } from '../types/loadingState'
import { AnyReactElement } from '../types/reactElements'

export default function setContent<RenderContentArgs = null>(
  loadingState: Loading,
  renderContent: (args?: RenderContentArgs) => AnyReactElement,
  renderContentArgs?: RenderContentArgs,
): null | AnyReactElement {
  switch (loadingState) {
    case Loading.IDLE:
      return null
    case Loading.PENDING:
      return <Spinner data-testid='loading-spinner' animation='border' variant='primary' />
    case Loading.SUCCEEDED:
      return renderContent(renderContentArgs)
    case Loading.FAILED:
      return (
        <Alert variant='danger' data-testid='error'>
          Error!
        </Alert>
      )
    default:
      return
  }
}
