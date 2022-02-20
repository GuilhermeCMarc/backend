import express from "express";
import { loginController } from "../use-cases/auth/login";

const authRouter = express.Router();

authRouter.post("/login", (req, res, next) =>
  loginController.handle(req, res, next)
);

export { authRouter };
