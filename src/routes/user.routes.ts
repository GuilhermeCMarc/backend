import express from "express";
import { AuthHandler } from "../middlewares/auth-handler";
import { createUserController } from "../use-cases/user/create";
import { deleteUserController } from "../use-cases/user/delete";
import { findAllUsersController } from "../use-cases/user/find-all";
import { findUserByEmailController } from "../use-cases/user/find-by-email";

import { findUserByIdController } from "../use-cases/user/find-by-id";
import { updateUserController } from "../use-cases/user/update";

const userRouter = express.Router();

userRouter.post("/", (req, res, next) =>
  createUserController.handle(req, res, next)
);
userRouter.get("/", AuthHandler, (req, res, next) =>
  findAllUsersController.handle(req, res, next)
);
userRouter.get("/:id", AuthHandler, (req, res, next) =>
  findUserByIdController.handle(req, res, next)
);
userRouter.get("/email/:email", AuthHandler, (req, res, next) =>
  findUserByEmailController.handle(req, res, next)
);
userRouter.put("/", AuthHandler, (req, res, next) =>
  updateUserController.handle(req, res, next)
);
userRouter.delete("/:id", AuthHandler, (req, res, next) =>
  deleteUserController.handle(req, res, next)
);

export { userRouter };
