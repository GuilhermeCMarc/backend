import { UpdateTaskController } from "./update-task.controller";
import { UpdateTaskUseCase } from "./update-task.use-case";

const updateTaskUseCase = new UpdateTaskUseCase();
const updateTaskController = new UpdateTaskController(updateTaskUseCase);

export { updateTaskController, updateTaskUseCase };
