import { IIssue, IssueType } from "../../common/types/issue";
import {
  inProgressIssuesSelector,
  openedIssuesSelector,
  closedIssuesSelector,
} from "../../redux/selectors/issuesSelectors";
import { RootState } from "../../redux/store";

type getTitleAndSelectorByIssueReturnType = {
  todoSelector: (state: RootState) => IIssue[];
  title: string;
};

export default function getTitleAndSelectorByIssue(
  type: IssueType
): getTitleAndSelectorByIssueReturnType {
  switch (type) {
    case IssueType.OPEN:
      return {
        todoSelector: openedIssuesSelector,
        title: "ToDo",
      };
    case IssueType.INPROGRESS:
      return {
        todoSelector: inProgressIssuesSelector,
        title: "In Progress",
      };
    case IssueType.CLOSED:
      return {
        todoSelector: closedIssuesSelector,
        title: "Done",
      };
    default:
      throw new Error("Unexpected IssueType");
  }
}
