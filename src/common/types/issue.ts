import { IUser } from "./user";

export enum IssueType {
  OPEN = "open",
  CLOSED = "closed",
  INPROGRESS = "inprogress",
}

export interface IIssue {
  id: number;
  order: number;
  title: string;
  state: IssueType;
  createdAt: string;
  updatedAt?: string;
  closedAt?: string;
  commentsNumber: number;
  user: IUser;
  assignee?: IUser;
  assignees?: IUser[];
}
