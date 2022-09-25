export type ApiRequest<ArgsType, ReturnType> = (
  args: ArgsType
) => Promise<ReturnType>;
