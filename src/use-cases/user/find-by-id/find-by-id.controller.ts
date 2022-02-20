import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../../utils/api-error";
import { IController } from "../../../utils/controller-interface";
import { Validator } from "../../../utils/validator";
import { UserResponse } from "../user-response";
import { FindUserByIdUseCase } from "./find-by-id.use-case";

export class FindUserByIdController implements IController {
  constructor(private useCase: FindUserByIdUseCase) {}

  async handle(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void | Response> {
    const id = req.params.id;

    if (!Validator.isValidUUID(id))
      return next(ApiError.badRequest("param must be a valid id"));

    const { data: user } = await this.useCase.execute(id);

    if (!user)
      return next(ApiError.noContent("no user was found with this id"));

    return res.status(200).send(new UserResponse(user));
  }
}
