import { FindUserByIdController } from "./find-by-id.controller";
import { FindUserByIdUseCase } from "./find-by-id.use-case";

const findUserByIdUseCase = new FindUserByIdUseCase();
const findUserByIdController = new FindUserByIdController(findUserByIdUseCase);

export { findUserByIdUseCase, findUserByIdController };
