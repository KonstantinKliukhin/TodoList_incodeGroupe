import { Loading } from "../../common/types/loadingState";
import { storageRepoService } from "../../service";

export default function getReposState() {
  const repos = storageRepoService.getRepos() || [];
  return {
    repos: repos,
    currentIssue: null,
    currentRepoLoadingStatus: Loading.IDLE,
    currentRepoId: null,
  };
}
