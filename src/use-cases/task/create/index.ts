import { CreateTaskController } from "./create-task.controller";
import { CreateTaskUseCase } from "./create-task.use-case";

const createTaskUseCase = new CreateTaskUseCase();
const createTaskController = new CreateTaskController(createTaskUseCase);

export { createTaskUseCase, createTaskController };
