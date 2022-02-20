import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../utils/api-error";
import { IController } from "../../../utils/controller-interface";
import { Validator } from "../../../utils/validator";
import { UserResponse } from "../user-response";
import { CreateUserUseCase } from "./create-user.use-case";

export class CreateUserController implements IController {
  constructor(public useCase: CreateUserUseCase) {}

  async handle(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<Response | void> {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName)
      return next(ApiError.badRequest("user must have a first name"));

    if (!lastName)
      return next(ApiError.badRequest("user must have a last name"));

    if (!email) return next(ApiError.badRequest("user must have an email"));

    if (!password)
      return next(ApiError.badRequest("user must have a password"));

    const { data: createdUser, error } = await this.useCase.execute({
      firstName,
      lastName,
      email,
      password,
    });

    if (error) return next(error);

    return res.status(201).send(new UserResponse(createdUser));
  }
}
