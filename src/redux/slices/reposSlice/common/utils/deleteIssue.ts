import { IssueState } from '../../../../../types/issue'
import { DeleteIssueType } from '../types/deleteIssue'

const deleteIssue: DeleteIssueType = (state, currentRepoIndex) => {
  if (!state.currentRepoId || !state.currentIssue) return

  switch (state.currentIssue.state) {
    case IssueState.OPEN:
      state.repos[currentRepoIndex].openIssues = state.repos[currentRepoIndex].openIssues.filter(
        (issue) => {
          return issue.id !== state.currentIssue?.id
        },
      )
      break
    case IssueState.INPROGRESS:
      state.repos[currentRepoIndex].inProgressIssues = state.repos[
        currentRepoIndex
      ].inProgressIssues.filter((issue) => {
        return issue.id !== state.currentIssue?.id
      })
      break
    case IssueState.CLOSED:
      state.repos[currentRepoIndex].closedIssues = state.repos[
        currentRepoIndex
      ].closedIssues.filter((issue) => {
        return issue.id !== state.currentIssue?.id
      })
      break
    default: {
      const exhaustiveCheck: never = state.currentIssue.state
      throw new Error(exhaustiveCheck)
    }
  }
}

export default deleteIssue
