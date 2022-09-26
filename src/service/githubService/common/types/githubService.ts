import { IssueType } from "../../../../common/types/issue";
import { ApiRequest } from "../../../common/types/apiRequest";
import { IIssue } from "./../../../../common/types/issue";
import { IGithubIssue } from "./entyties/githubIssue";
import { IGithubUser } from "./entyties/githubUser";
import { IUser } from "./../../../../common/types/user";
import { RepoStars } from "../../../../common/types/repoStars";
import { IGithubRepository } from "./entyties/githubRepository";

export interface IGetIssuesOptions {
  owner: string;
  repo: string;
  state: IssueType;
}

export type GetIssueReturnType = IIssue[];

export type GetAllIssuesType = ApiRequest<
  IGetIssuesOptions,
  GetIssueReturnType
>;

export interface IGetRepoStarsOptions {
  owner: string;
  repo: string;
}

export type GetRepoStarsReturnType = RepoStars;

export type GetRepoStarsType = ApiRequest<
  IGetRepoStarsOptions,
  GetRepoStarsReturnType
>;

export interface IGithubService {
  getRepoStars: GetRepoStarsType;
  getAllIssues: GetAllIssuesType;
  normalizeUser: (user: IGithubUser) => IUser;
  normalizeIssue: (issue: IGithubIssue) => IIssue;
  normalizeRepoStars: (repo: IGithubRepository) => RepoStars;
}
