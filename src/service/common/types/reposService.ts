import { ApiRequest } from './apiRequest';
import { IRepo } from './../../../common/types/repository';

export interface IGetRepoOptions {
  owner: string;
  repoName: string;
}

export interface IReposService<> {
  getRepo: ApiRequest<IGetRepoOptions, IRepo>;
  authToken: string;
}
