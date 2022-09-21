import { IGithubApi } from './common/types/githubApiTypes';
import getIssues from './getIssues';

const githubApi: IGithubApi = {
  getIssues,
};

export default githubApi;
