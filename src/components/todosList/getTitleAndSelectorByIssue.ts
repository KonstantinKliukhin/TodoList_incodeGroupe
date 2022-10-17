import {
  closedIssuesSelector,
  inProgressIssuesSelector,
  openedIssuesSelector,
} from '../../redux/selectors/issuesSelectors'
import { RootState } from '../../redux/store'
import { IIssue, IssueState } from '../../types/issue'

type getTitleAndSelectorByIssueReturnType = {
  todoSelector: (state: RootState) => IIssue[]
  title: string
}

export default function getTitleAndSelectorByIssue(
  type: IssueState,
): getTitleAndSelectorByIssueReturnType {
  switch (type) {
    case IssueState.OPEN:
      return {
        todoSelector: openedIssuesSelector,
        title: 'ToDo',
      }
    case IssueState.INPROGRESS:
      return {
        todoSelector: inProgressIssuesSelector,
        title: 'In Progress',
      }
    case IssueState.CLOSED:
      return {
        todoSelector: closedIssuesSelector,
        title: 'Done',
      }
    default:
      throw new Error(`Unexpected IssueState: ${type}`)
  }
}
