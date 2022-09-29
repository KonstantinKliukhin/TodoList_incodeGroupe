export interface IStorageService {
  getValueByKey<ReturnValue>(key: string): ReturnValue | null;
  setValue<Value>(key: string, value: Value): boolean;
  removeValueByKey(key: string): void;
  clearLocalStorage(): void;
}
