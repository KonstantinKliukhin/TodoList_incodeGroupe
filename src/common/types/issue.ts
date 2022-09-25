import { IUser } from "./user";

export enum IssueType {
  OPEN = "open",
  CLOSED = "closed",
  ALL = "all",
}

export type IssueState = IssueType.OPEN | IssueType.CLOSED;

export interface IIssue {
  id: number;
  title: string;
  state: IssueState;
  createdAt: string;
  closedAt?: string;
  commentsNumber: number;
  user: IUser;
  assignee?: IUser;
  assignees?: IUser[];
}
