import { UpdateUserController } from "./update-user.controller";
import { UpdateUserUseCase } from "./update-user.use-case";

const updateUserUseCase = new UpdateUserUseCase();
const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserUseCase, updateUserController };
