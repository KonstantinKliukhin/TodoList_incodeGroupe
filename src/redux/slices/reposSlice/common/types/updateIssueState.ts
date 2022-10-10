import { IIssue, IssueState } from "../../../../../types/issue";

export type UpdateIssueType = (issueState: IssueState, issue: IIssue) => void;
