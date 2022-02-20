import express from "express";
import { AuthHandler } from "../middlewares/auth-handler";
import { createTaskController } from "../use-cases/task/create";
import { deleteTaskController } from "../use-cases/task/delete";
import { findAllTasksController } from "../use-cases/task/find-all";
import { findTasksByParendIdController } from "../use-cases/task/find-by-parent-id";
import { findTasksByUserIDController } from "../use-cases/task/find-by-user-id";
import { updateTaskController } from "../use-cases/task/update";

const taskRouter = express.Router();

taskRouter.get("/", AuthHandler, (req, res, next) =>
  findAllTasksController.handle(req, res, next)
);
taskRouter.get("/user/:id", AuthHandler, (req, res, next) =>
  findTasksByUserIDController.handle(req, res, next)
);
taskRouter.get("/parent/:id", AuthHandler, (req, res, next) =>
  findTasksByParendIdController.handle(req, res, next)
);
taskRouter.post("/", AuthHandler, (req, res, next) =>
  createTaskController.handle(req, res, next)
);
taskRouter.put("/", AuthHandler, (req, res, next) =>
  updateTaskController.handle(req, res, next)
);
taskRouter.delete("/:id", AuthHandler, (req, res, next) =>
  deleteTaskController.handle(req, res, next)
);

export { taskRouter };
