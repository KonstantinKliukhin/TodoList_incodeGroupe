import { IRepo } from '../../../types/repository'
import { ApiRequest } from './apiRequest'

export interface IGetRepoOptions {
  owner: string
  repoName: string
}

export interface IReposService {
  getRepo: ApiRequest<IGetRepoOptions, IRepo>
  authToken: string
}
