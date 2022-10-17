import { IStorageService } from './../common/types/storageService'

class LocalstorageService implements IStorageService {
  getValueByKey<ReturnValue>(key: string): ReturnValue | null {
    const result = localStorage.getItem(key)

    if (result?.length) {
      return JSON.parse(result)
    } else {
      return null
    }
  }

  setValue<Value>(key: string, value: Value): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value))

      return true
    } catch (e) {
      return false
    }
  }

  removeValueByKey(key: string): void {
    localStorage.removeItem(key)
  }

  clearLocalStorage(): void {
    localStorage.clear()
  }
}

const localStorageService = new LocalstorageService()

export default localStorageService
