import { IIssue } from '../../types/issue'
import { IRepo } from '../../types/repository'
import { findElementById } from '../../utils'
import { RootState } from '../store'

function getCurrentRepo(state: RootState): null | IRepo {
  if (!state.repos.currentRepoId) return null

  const currentRepo = findElementById<IRepo>(state.repos.repos, state.repos.currentRepoId)

  if (!currentRepo) return null

  return currentRepo
}

export function openedIssuesSelector(state: RootState): IIssue[] {
  const currentRepo = getCurrentRepo(state)

  if (!currentRepo) return []
  return currentRepo.openIssues
}

export function inProgressIssuesSelector(state: RootState): IIssue[] {
  const currentRepo = getCurrentRepo(state)

  if (!currentRepo) return []

  return currentRepo.inProgressIssues
}

export function closedIssuesSelector(state: RootState): IIssue[] {
  const currentRepo = getCurrentRepo(state)

  if (!currentRepo) return []

  return currentRepo.closedIssues
}
