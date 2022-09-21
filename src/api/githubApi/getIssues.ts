import { ApiRequest } from '../common/types/request';
import { IGithubIssue } from './common/types/entyties/githubIssue';
import { getIssueReturnType, getIssuesOptions } from './common/types/getIssueTypes';
import { normalizeIssue } from "./normalize";

const getIssues: ApiRequest<getIssuesOptions, getIssueReturnType> = async ({ owner, repo, state }) => {
	const url = new URL(`https://api.github.com/repos/${owner}/${repo}/issues`);
	url.searchParams.append('state', state);
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
				accept: 'application/vnd.github+json',
        Authorization: 'Bearer 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',
      },
    });

		if (!res.ok) {
			throw new Error(res.statusText);
		}
    const parsedRes: IGithubIssue[] = await res.json();

		return parsedRes.map(elem => {
			return normalizeIssue(elem);
		});
  } catch(e: any) {
    throw new Error(e);
  }
};

export default getIssues;
