import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ApiError } from "../../../utils/api-error";
import { IController } from "../../../utils/controller-interface";
import { Validator } from "../../../utils/validator";
import { DeleteUserUseCase } from "./delete-user.use-case";

export class DeleteUserController implements IController {
  constructor(private useCase: DeleteUserUseCase) {}

  async handle(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void | Response> {
    const { id } = req.params;

    if (!Validator.isValidUUID(id))
      return next(ApiError.badRequest("user id is invalid"));

    const { data, error } = await this.useCase.execute(id);

    if (error) return next(error);

    return res.sendStatus(204);
  }
}
