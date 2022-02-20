import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ApiError } from "../../../utils/api-error";
import { IController } from "../../../utils/controller-interface";
import { UserResponse } from "../user-response";
import { FindAllUsersUseCase } from "./find-all-users.use-case";

export class FindAllUsersController implements IController {
  constructor(private useCase: FindAllUsersUseCase) {}

  async handle(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<Response> {
    const { data, error } = await this.useCase.execute();

    if (error) next(ApiError.internal(error.message));

    return res.status(200).json(data.map((x) => new UserResponse(x)));
  }
}
