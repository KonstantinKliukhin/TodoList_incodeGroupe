import { IUser } from './user';

export enum IssueState {
  OPEN = 'open',
  CLOSED = 'closed',
}

export enum IssueType {
  OPEN = 'open',
  CLOSED = 'closed',
  ALL = 'all',
}

export interface IIssue {
  id: number;
  title: string;
  state: IssueState;
  createdAt: string;
  closedAt?: string;
  commentsNumber: number;
  user: IUser;
}
