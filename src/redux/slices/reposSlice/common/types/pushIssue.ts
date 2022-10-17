import { IIssue, IssueState } from '../../../../../types/issue'
import { IRepo } from '../../../../../types/repository'

export type PushIssueType = (
  issueState: IssueState,
  currentRepo: IRepo,
  currentIssue: IIssue,
) => void
