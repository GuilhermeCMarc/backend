import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ApiError } from "../../../utils/api-error";
import { IController } from "../../../utils/controller-interface";
import { Validator } from "../../../utils/validator";
import { TaskResponse } from "../task-response";
import { FindTasksByParendIdUseCase } from "./find-tasks-by-parent-id.use-case";

export class FindTasksByParendIdController implements IController {
  constructor(private useCase: FindTasksByParendIdUseCase) {}

  async handle(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void | Response> {
    const { id } = req.params;

    if (!id) return next(ApiError.badRequest("you must pass an id"));

    if (!Validator.isValidUUID(id))
      return next(ApiError.badRequest("invalid id"));

    const { data, error } = await this.useCase.execute(id);

    if (error) return next(error);

    return res.status(200).send(data.map((x) => new TaskResponse(x)));
  }
}
