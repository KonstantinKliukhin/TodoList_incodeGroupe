import { IIssue } from '../../../../../common/types/issue';
import { IRepo } from '../../../../../common/types/repository';

export type InsertIssuesType = (
  repo: IRepo,
  issueWithNewIndex: IIssue,
  currentIssue: IIssue,
  displacement: number
) => void;
