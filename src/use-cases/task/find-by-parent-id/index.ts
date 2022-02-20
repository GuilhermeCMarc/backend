import { FindTasksByParendIdController } from "./find-tasks-by-parent-id.controller";
import { FindTasksByParendIdUseCase } from "./find-tasks-by-parent-id.use-case";

const findTasksByParendIdUseCase = new FindTasksByParendIdUseCase();
const findTasksByParendIdController = new FindTasksByParendIdController(
  findTasksByParendIdUseCase
);

export { findTasksByParendIdUseCase, findTasksByParendIdController };
