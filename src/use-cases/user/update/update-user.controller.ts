import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ApiError } from "../../../utils/api-error";
import { IController } from "../../../utils/controller-interface";
import { Validator } from "../../../utils/validator";
import { UpdateUserUseCase } from "./update-user.use-case";

export class UpdateUserController implements IController {
  constructor(private useCase: UpdateUserUseCase) {}

  async handle(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void | Response> {
    const { firstName, lastName, id, email } = req.body;

    if (!firstName || !lastName)
      return next(ApiError.badRequest("must have a name"));

    if (!Validator.isValidUUID(id))
      return next(ApiError.badRequest("invalid id"));

    if (!Validator.isValidEmail(email))
      return next(ApiError.badRequest("invalid email"));

    const { error } = await this.useCase.execute(req.body);

    if (error) return next(error);

    return res.sendStatus(204);
  }
}
