import { DeleteUserController } from "./delete-user.controller";
import { DeleteUserUseCase } from "./delete-user.use-case";

const deleteUserUseCase = new DeleteUserUseCase();
const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserUseCase, deleteUserController };
