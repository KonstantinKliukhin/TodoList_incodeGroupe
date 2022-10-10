import { IIssue } from "./issue";

export interface IRepo {
  id: number;
  owner: string;
  repoName: string;
  openIssues: IIssue[];
  inProgressIssues: IIssue[];
  closedIssues: IIssue[];
  starsNumber: number;
}
