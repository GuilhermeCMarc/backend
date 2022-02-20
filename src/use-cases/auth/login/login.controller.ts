import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../../utils/api-error";
import { IController } from "../../../utils/controller-interface";
import { Validator } from "../../../utils/validator";
import { UserResponse } from "../../user/user-response";
import { LoginUseCase } from "./login.use-case";

export class LoginController implements IController {
  constructor(private useCase: LoginUseCase) {}

  async handle(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<void | Response> {
    const { email, password } = req.body;

    if (!Validator.isValidEmail(email))
      return next(ApiError.badRequest("invalid email"));

    const { data, error } = await this.useCase.execute({ email, password });

    if (error) return next(error);

    const { user, jwtToken } = data;

    const formatedUser = new UserResponse(user);

    return res
      .status(200)
      .setHeader("jwt-token", jwtToken)
      .send({ ...formatedUser, jwtToken });
  }
}
