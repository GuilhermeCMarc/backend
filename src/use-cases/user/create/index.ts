import { CreateUserController } from "./create-user.controller";
import { CreateUserUseCase } from "./create-user.use-case";

const createUserUseCase = new CreateUserUseCase();
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
