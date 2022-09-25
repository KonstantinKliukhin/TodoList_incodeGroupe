import { Loading } from "../common/types/loadingState";
import { AnyReactElement } from "../common/types/reactElements";

export default function setContent<RenderContentArgs = null>(
  loadingState: Loading,
  renderContent: () => AnyReactElement,
  renderContentArgs?: RenderContentArgs
): null | AnyReactElement {
  switch (loadingState) {
    case Loading.IDLE:
      return null;
    case Loading.PENDING:
      return <p>Loading...</p>;
    case Loading.SUCCEEDED:
      return renderContent();
    case Loading.FAILED:
      return <p>Error!!!</p>;
    default:
      return;
  }
}
