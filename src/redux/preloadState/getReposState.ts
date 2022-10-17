import { storageRepoService } from '../../service'
import { Loading } from '../../types/loadingState'

export default function getReposState() {
  const repos = storageRepoService.getRepos() || []
  return {
    repos: repos,
    currentIssue: null,
    currentRepoLoadingStatus: Loading.IDLE,
    currentRepoId: null,
  }
}
