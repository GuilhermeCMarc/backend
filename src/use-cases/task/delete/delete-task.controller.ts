import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../../utils/api-error";
import { IController } from "../../../utils/controller-interface";
import { Validator } from "../../../utils/validator";
import { TaskResponse } from "../task-response";
import { DeleteTaskUseCase } from "./delete-task.use-case";

export class DeleteTaskController implements IController {
  constructor(private useCase: DeleteTaskUseCase) {}

  async handle(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void | Response> {
    const { id } = req.params;

    if (!Validator.isValidUUID(id))
      return next(ApiError.badRequest("invalid id"));

    const { data: deletedTask, error } = await this.useCase.execute(id);

    if (error) return next(error);

    res.status(200).send(new TaskResponse(deletedTask));
  }
}
