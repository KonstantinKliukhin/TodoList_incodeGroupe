import { GithubApiURL } from "../../common/types/githubApiURL";
import { IIssue, IssueType } from "../../common/types/issue";
import { IRepo } from "../../common/types/repository";
import { IUser } from "../../common/types/user";
import { ApiRequest } from "../common/types/apiRequest";
import { FetchService } from "../common/types/fetchService";
import { IReposService } from "../common/types/reposService";
import { IGithubIssue } from "./common/types/entyties/githubIssue";
import { IGithubRepository } from "./common/types/entyties/githubRepository";
import { IGithubUser } from "./common/types/entyties/githubUser";
import { IRepoInfo } from "./common/types/entyties/repoInfo";

interface IGetIssuesOptions {
  owner: string;
  repoName: string;
  state: "all" | "open" | "closed";
}

type GetAllIssuesType = ApiRequest<
  IGetIssuesOptions,
  Pick<IRepo, "closedIssues" | "inProgressIssues" | "openIssues">
>;

export interface IGetRepoInfoOptions {
  owner: string;
  repoName: string;
}

type GetRepoInfoType = ApiRequest<IGetRepoInfoOptions, IRepoInfo>;

interface IGetRepoOptions {
  owner: string;
  repoName: string;
}

export type GetRepoType = ApiRequest<IGetRepoOptions, IRepo>;

class GithubService extends FetchService implements IReposService {
  authToken: string;

  constructor(authToken: string) {
    super();

    if (!authToken) {
      throw new Error("No auth token provided");
    }

    this.authToken = authToken;
  }

  private readonly getAllIssues: GetAllIssuesType = async ({
    owner,
    repoName,
    state,
  }) => {
    const url = new URL(
      `${GithubApiURL.BASEURL}${GithubApiURL.REPOSPATH}/${owner}/${repoName}/${GithubApiURL.ISSUEPATH}`
    );

    url.searchParams.append("state", state);
    const res = await this.request<IGithubIssue[]>(url, {
      method: "GET",
      headers: {
        accept: "application/vnd.github+json",
        Authorization: this.authToken,
      },
    });

    return this.normalizeIssues(res);
  };

  private readonly getRepoInfo: GetRepoInfoType = async ({
    owner,
    repoName,
  }) => {
    const url = new URL(
      `${GithubApiURL.BASEURL}${GithubApiURL.REPOSPATH}/${owner}/${repoName}`
    );

    const res = await this.request<IGithubRepository>(url, {
      method: "GET",
      headers: {
        accept: "application/vnd.github+json",
        Authorization: this.authToken,
      },
    });

    return this.normalizeRepoInfo(res);
  };

  getRepo: GetRepoType = async ({ owner, repoName }) => {
    const issues = await this.getAllIssues({
      owner,
      repoName,
      state: "all",
    });

    const repoInfo = await this.getRepoInfo({ owner, repoName });

    return {
      ...repoInfo,
      ...issues,
    };
  };

  private readonly normalizeIssue = (issue: IGithubIssue): IIssue => {
    let state;

    if (issue.state === IssueType.CLOSED) {
      state = IssueType.CLOSED;
    } else if (
      issue.state === IssueType.OPEN &&
      (issue.assignee || issue.assignees?.length)
    ) {
      state = IssueType.INPROGRESS;
    } else {
      state = IssueType.OPEN;
    }

    return {
      id: issue.id,
      order: issue.number,
      title: issue.title,
      createdAt: issue.created_at,
      closedAt: issue.closed_at,
      commentsNumber: issue.comments,
      user: this.normalizeUser(issue.user),
      state,
      assignee: issue.assignee ? this.normalizeUser(issue.assignee) : undefined,
      assignees: issue.assignees?.map((assignee) =>
        this.normalizeUser(assignee)
      ),
    };
  };

  private readonly normalizeIssues = (issues: IGithubIssue[]) => {
    const allIssues = issues.map((issue) => {
      return this.normalizeIssue(issue);
    });

    return {
      openIssues: allIssues.filter((issue) => {
        return (
          issue.state === IssueType.OPEN &&
          !issue.assignee &&
          !issue.assignees?.length
        );
      }),
      inProgressIssues: allIssues.filter((issue) => {
        return (
          issue.state === IssueType.OPEN &&
          (issue.assignee || issue.assignees?.length)
        );
      }),
      closedIssues: allIssues.filter((issue) => {
        return issue.state === IssueType.CLOSED;
      }),
    };
  };

  private readonly normalizeUser = (user: IGithubUser): IUser => {
    return {
      id: user.id,
      name: user.login,
    };
  };

  private readonly normalizeRepoInfo = (repo: IGithubRepository): IRepoInfo => {
    return {
      id: repo.id,
      starsNumber: repo.stargazers_count,
      repoName: repo.name,
      owner: this.normalizeUser(repo.owner).name,
    };
  };
}

const githubService = new GithubService(process.env.REACT_APP_GITHUB_API_KEY!);

export default githubService;
