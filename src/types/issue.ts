import { IUser } from "./user";

export enum IssueState {
  OPEN = "open",
  CLOSED = "closed",
  INPROGRESS = "inprogress",
}

export interface IIssue {
  id: number;
  order: number;
  title: string;
  state: IssueState;
  createdAt: string;
  updatedAt?: string;
  closedAt?: string;
  commentsNumber: number;
  user: IUser;
  assignee?: IUser;
  assignees?: IUser[];
}
