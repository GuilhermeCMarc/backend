import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IController } from "../../../utils/controller-interface";
import { TaskResponse } from "../task-response";
import { FindallTasksUseCase } from "./find-all-tasks.use-case";

export class FindAllTasksController implements IController {
  constructor(private useCase: FindallTasksUseCase) {}

  async handle(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void | Response> {
    const { data, error } = await this.useCase.execute();

    if (error) return next(error);

    return res.status(200).send(data.map((x) => new TaskResponse(x)));
  }
}
