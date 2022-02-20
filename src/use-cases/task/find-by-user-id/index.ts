import { FindTasksByUserIDController } from "./find-tasks-by-user-id.controller";
import { FindTasksByUserIDUseCase } from "./find-tasks-by-user-id.use-case";

const findTasksByUserIDUseCase = new FindTasksByUserIDUseCase();
const findTasksByUserIDController = new FindTasksByUserIDController(
  findTasksByUserIDUseCase
);

export { findTasksByUserIDUseCase, findTasksByUserIDController };
