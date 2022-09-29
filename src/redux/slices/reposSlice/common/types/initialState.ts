import { IIssue } from "../../../../../common/types/issue";
import { Loading } from "../../../../../common/types/loadingState";
import { IRepo } from "../../../../../common/types/repository";

export interface IRepoInitialState {
  currentRepoId: number | null;
  currentIssue: IIssue | null;
  currentRepoLoadingStatus: Loading;
  repos: IRepo[];
}