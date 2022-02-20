import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-error";

export function errorHandler(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    res.status(err.status).send({ message: err.message });
    return;
  }

  return res.status(500).send("something went wrong");
}
