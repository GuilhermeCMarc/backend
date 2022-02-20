import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ApiError } from "../../../utils/api-error";
import { IController } from "../../../utils/controller-interface";
import { Validator } from "../../../utils/validator";
import { TaskResponse } from "../task-response";
import { FindTasksByUserIDUseCase } from "./find-tasks-by-user-id.use-case";

export class FindTasksByUserIDController implements IController {
  constructor(private useCase: FindTasksByUserIDUseCase) {}

  async handle(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void | Response> {
    const { id } = req.params;

    if (!Validator.isValidUUID(id))
      return next(ApiError.badRequest("invalid id"));

    const { data, error } = await this.useCase.execute(id);

    if (error) return next(error);

    return res.status(200).send(data.map((x) => new TaskResponse(x)));
  }
}
