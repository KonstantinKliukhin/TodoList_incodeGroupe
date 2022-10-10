import { IIssue } from "../../../../../types/issue";
import { Loading } from "../../../../../types/loadingState";
import { IRepo } from "../../../../../types/repository";

export interface IRepoInitialState {
  currentRepoId: number | null;
  currentIssue: IIssue | null;
  currentRepoLoadingStatus: Loading;
  repos: IRepo[];
}
