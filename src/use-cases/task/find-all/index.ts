import { FindAllTasksController } from "./find-all-tasks.controller";
import { FindallTasksUseCase } from "./find-all-tasks.use-case";

const findallTasksUseCase = new FindallTasksUseCase();
const findAllTasksController = new FindAllTasksController(findallTasksUseCase);

export { findAllTasksController, findallTasksUseCase };
