import { IIssue, IssueType } from '../../../../../common/types/issue';

export type UpdateIssueStateType = (issueType: IssueType, issue: IIssue) => void;
