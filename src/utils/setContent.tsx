import { Loading } from "../common/types/loadingState";
import { AnyReactElement } from "../common/types/reactElements";
import { Alert, Spinner } from "react-bootstrap";

export default function setContent<RenderContentArgs = null>(
  loadingState: Loading,
  renderContent: (args?: RenderContentArgs) => AnyReactElement,
  renderContentArgs?: RenderContentArgs
): null | AnyReactElement {
  switch (loadingState) {
    case Loading.IDLE:
      return null;
    case Loading.PENDING:
      return <Spinner animation="border" variant="primary" />;
    case Loading.SUCCEEDED:
      return renderContent(renderContentArgs);
    case Loading.FAILED:
      return <Alert variant="danger">Error!</Alert>;
    default:
      return;
  }
}
