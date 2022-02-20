import { FindAllUsersController } from "./find-all-users.controller";
import { FindAllUsersUseCase } from "./find-all-users.use-case";

const findAllUsersUseCase = new FindAllUsersUseCase();
const findAllUsersController = new FindAllUsersController(findAllUsersUseCase);

export { findAllUsersUseCase, findAllUsersController };
