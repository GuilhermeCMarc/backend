import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ApiError } from "../../../utils/api-error";
import { IController } from "../../../utils/controller-interface";
import { Validator } from "../../../utils/validator";
import { TaskResponse } from "../task-response";
import { UpdateTaskRequestDTO } from "./update-task-request.dto";
import { UpdateTaskUseCase } from "./update-task.use-case";

export class UpdateTaskController implements IController {
  constructor(private useCase: UpdateTaskUseCase) {}

  async handle(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void | Response> {
    const { id, name, description, isDone }: UpdateTaskRequestDTO = req.body;

    if (!Validator.isValidUUID(id))
      return next(ApiError.badRequest("invalid id"));

    const { data: task, error } = await this.useCase.execute({
      id,
      name,
      description,
      isDone,
    });

    if (error) return next(error);

    return res.status(200).send(new TaskResponse(task));
  }
}
