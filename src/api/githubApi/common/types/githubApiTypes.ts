import { getIssueType } from "./getIssueTypes";

export interface IGithubApi {
  getIssues: getIssueType;
}
