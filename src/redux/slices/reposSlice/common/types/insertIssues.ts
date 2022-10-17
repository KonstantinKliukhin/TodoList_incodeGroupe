import { IIssue } from '../../../../../types/issue'
import { IRepo } from '../../../../../types/repository'

export type InsertIssuesType = (
  repo: IRepo,
  issueWithNewIndex: IIssue,
  currentIssue: IIssue,
  displacement: number,
) => void
