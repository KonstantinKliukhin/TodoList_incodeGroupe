import { Service } from "../common/types/service";
import { GithubApiURL } from "../../common/types/githubApiURL";
import {
  GetAllIssuesType,
  GetRepoStarsType,
  IGithubService,
} from "./common/types/githubService";
import { IGithubIssue } from "./common/types/entyties/githubIssue";
import { IIssue } from "./../../common/types/issue";
import { IUser } from "./../../common/types/user";
import { IGithubUser } from "./common/types/entyties/githubUser";
import { IGithubRepository } from "./common/types/entyties/githubRepository";
import { RepoStars } from "../../common/types/repoStars";

class GithubService extends Service implements IGithubService {
  authToken: string;

  constructor(authToken: string) {
    super();

    if (!authToken) {
      throw new Error("No auth token provided");
    }

    this.authToken = authToken;
  }

  getAllIssues: GetAllIssuesType = async ({ owner, repo, state }) => {
    const url = new URL(
      `${GithubApiURL.BASEURL}${GithubApiURL.REPOSPATH}/${owner}/${repo}/${GithubApiURL.ISSUEPATH}`
    );

    url.searchParams.append("state", state);
    const res = await this.request<IGithubIssue[]>(url, {
      method: "GET",
      headers: {
        accept: "application/vnd.github+json",
        Authorization: this.authToken,
      },
    });

    return res.map((element) => {
      return this.normalizeIssue(element);
    });
  };

  getRepoStars: GetRepoStarsType = async ({ owner, repo }) => {
    const url = new URL(
      `${GithubApiURL.BASEURL}${GithubApiURL.REPOSPATH}/${owner}/${repo}`
    );

    const res = await this.request<IGithubRepository>(url, {
      method: "GET",
      headers: {
        accept: "application/vnd.github+json",
        Authorization: this.authToken,
      },
    });

    return this.normalizeRepoStars(res);
  };

  normalizeIssue = (issue: IGithubIssue): IIssue => {
    return {
      id: issue.id,
      number: issue.number,
      title: issue.title,
      createdAt: issue.created_at,
      closedAt: issue.closed_at,
      commentsNumber: issue.comments,
      user: this.normalizeUser(issue.user),
      state: issue.state,
      assignee: issue.assignee ? this.normalizeUser(issue.assignee) : undefined,
      assignees: issue.assignees?.map((assignee) =>
        this.normalizeUser(assignee)
      ),
    };
  };

  normalizeUser = (user: IGithubUser): IUser => {
    return {
      id: user.id,
      name: user.login,
    };
  };

  normalizeRepoStars = (repo: IGithubRepository): RepoStars => {
    return repo.stargazers_count;
  };
}

const githubService = new GithubService(process.env.REACT_APP_GITHUB_API_KEY!);

export default githubService;
