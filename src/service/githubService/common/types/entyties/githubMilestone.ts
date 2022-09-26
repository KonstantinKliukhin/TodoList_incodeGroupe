import { IGithubUser } from "./githubUser";

export interface IGithubMilestone {
  url: string;
  html_url: string;
  ILabels_url: string;
  id: number;
  node_id: string;
  number: number;
  state: string;
  title: string;
  description: string;
  creator: IGithubUser;
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  closed_at: string;
  due_on: string;
}
