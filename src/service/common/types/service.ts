export interface IService {
  request: <ReturnType>(
    url: URL,
    fetchOptions?: RequestInit
  ) => Promise<ReturnType>;
}

export abstract class Service implements IService {
  async request<ReturnType>(
    url: URL,
    fetchOptions?: RequestInit
  ): Promise<ReturnType> {
    try {
      const res = await fetch(url, fetchOptions);

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const parsedRes: ReturnType = await res.json();

      return parsedRes;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
