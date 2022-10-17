import { IssueState } from '../../../../../types/issue'
import { InsertIssuesType } from '../types/insertIssues'
import findNewIssueIndex from './findNewIssueIndex'

const insertIssues: InsertIssuesType = (repo, issueWithNewIndex, currentIssue, displacement) => {
  let newIssueIndex: number
  switch (issueWithNewIndex.state) {
    case IssueState.OPEN:
      newIssueIndex = findNewIssueIndex(repo.openIssues, issueWithNewIndex.id, displacement)

      repo.openIssues.splice(newIssueIndex, 0, currentIssue)
      break
    case IssueState.INPROGRESS:
      newIssueIndex = findNewIssueIndex(repo.inProgressIssues, issueWithNewIndex.id, displacement)

      repo.inProgressIssues.splice(newIssueIndex, 0, currentIssue)
      break
    case IssueState.CLOSED:
      newIssueIndex = findNewIssueIndex(repo.closedIssues, issueWithNewIndex.id, displacement)

      repo.closedIssues.splice(newIssueIndex, 0, currentIssue)
      break
    default: {
      const exhaustiveCheck: never = issueWithNewIndex.state
      throw new Error(exhaustiveCheck)
    }
  }
}

export default insertIssues
