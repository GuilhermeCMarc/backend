import { DeleteTaskController } from "./delete-task.controller";
import { DeleteTaskUseCase } from "./delete-task.use-case";

const deleteTaskUseCase = new DeleteTaskUseCase();
const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);

export { deleteTaskController, deleteTaskUseCase };
