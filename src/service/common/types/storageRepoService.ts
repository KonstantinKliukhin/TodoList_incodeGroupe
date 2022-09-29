import { IRepo } from "../../../common/types/repository";

export interface IStorageRepoService {
  saveRepo: (value: IRepo[]) => boolean;
  getRepos: () => IRepo[] | null;
}
