import { GithubApiURL } from "../../common/types/githubApiURL";
import { ApiRequest } from "../common/types/request";
import { IGithubIssue } from "./common/types/entyties/githubIssue";
import {
  getIssueReturnType,
  getIssuesOptions,
} from "./common/types/getIssueTypes";
import { normalizeIssue } from "./normalize";

const getIssues: ApiRequest<getIssuesOptions, getIssueReturnType> = async ({
  owner,
  repo,
  state,
}) => {
  const url = new URL(
    `${GithubApiURL.BASEURL}${GithubApiURL.REPOSPATH}/${owner}/${repo}/${GithubApiURL.ISSUEPATH}`
  );
  url.searchParams.append("state", state);
  try {
    if (!process.env.REACT_APP_GITHUB_API_KEY) {
      throw new Error("No auth token provided");
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/vnd.github+json",
        Authorization: process.env.REACT_APP_GITHUB_API_KEY,
      },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const parsedRes: IGithubIssue[] = await res.json();
    console.log(parsedRes);
    return parsedRes.map((elem) => {
      return normalizeIssue(elem);
    });
  } catch (e: any) {
    throw new Error(e);
  }
};

export default getIssues;
