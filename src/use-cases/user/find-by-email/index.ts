import { FindUserByEmailController } from "./find-user-by-email.controller";
import { FindUserByEmailUseCase } from "./find-user-by-email.use-case";

const findUserByEmailUseCase = new FindUserByEmailUseCase();
const findUserByEmailController = new FindUserByEmailController(
  findUserByEmailUseCase
);

export { findUserByEmailUseCase, findUserByEmailController };
