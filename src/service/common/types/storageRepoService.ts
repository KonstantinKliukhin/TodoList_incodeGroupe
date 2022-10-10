import { IRepo } from "../../../types/repository";

export interface IStorageRepoService {
  saveRepo: (value: IRepo[]) => boolean;
  getRepos: () => IRepo[] | null;
}
