import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../../utils/api-error";
import { IController } from "../../../utils/controller-interface";
import { Validator } from "../../../utils/validator";
import { UserResponse } from "../user-response";
import { FindUserByEmailUseCase } from "./find-user-by-email.use-case";

export class FindUserByEmailController implements IController {
  constructor(private useCase: FindUserByEmailUseCase) {}

  async handle(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void | Response> {
    const { email } = req.params;

    if (!Validator.isValidEmail(email))
      return next(ApiError.badRequest("parameter must be an valid email"));

    const { data: userFound, error } = await this.useCase.execute(email);

    if (error) return next(error);

    return res.status(200).send(new UserResponse(userFound));
  }
}
