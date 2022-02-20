import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ApiError } from "../../../utils/api-error";
import { IController } from "../../../utils/controller-interface";
import { Validator } from "../../../utils/validator";
import { TaskResponse } from "../task-response";
import { CreateTaskRequestDTO } from "./create-task-request.dto";
import { CreateTaskUseCase } from "./create-task.use-case";

export class CreateTaskController implements IController {
  constructor(private useCase: CreateTaskUseCase) {}

  async handle(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void | Response> {
    const { name, description, ownerId, parentId }: CreateTaskRequestDTO =
      req.body;

    if (!name) return next(ApiError.badRequest("task name must be provided"));

    if (!ownerId) return next(ApiError.badRequest("owner id must be provided"));

    if (parentId && !Validator.isValidUUID(parentId))
      return next(ApiError.badRequest("invalid parent id"));

    if (!Validator.isValidUUID(ownerId))
      return next(ApiError.badRequest("invalid owner id"));

    const { data, error } = await this.useCase.execute({
      name,
      description,
      ownerId,
      parentId,
    });

    if (error) return next(error);

    return res.status(201).send(new TaskResponse(data));
  }
}
