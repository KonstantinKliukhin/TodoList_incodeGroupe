import { LocalStorageKeys } from "../../common/types/localStorageKeys";
import { IRepo } from "../../common/types/repository";
import { IStorageRepoService } from "../common/types/storageRepoService";
import localStorageService from "../localStorageService/localStorageService";
import { IStorageService } from "./../common/types/storageService";

class StorageRepoService implements IStorageRepoService {
  private readonly repoKey: string;
  private readonly storage: IStorageService;

  constructor(repoKey: string, storage: IStorageService) {
    this.repoKey = repoKey;
    this.storage = storage;
  }

  saveRepo(value: IRepo[]) {
    return this.storage.setValue(this.repoKey, value);
  }

  getRepos() {
    return this.storage.getValueByKey<IRepo[]>(this.repoKey);
  }
}

const storageRepoService = new StorageRepoService(
  LocalStorageKeys.REPOSITORY,
  localStorageService
);

export default storageRepoService;
