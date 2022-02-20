import { ApiError } from "./api-error";

export interface IUseCase<D = any, R = any> {
  execute(data?: D): Promise<IUseCaseReturn<R>>;
}

export interface IUseCaseReturn<R = any> {
  data?: R | null;
  error?: ApiError | null;
}
