import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error";

export function AuthHandler(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["jwt-token"];

  if (!token) return next(ApiError.notAuthorized("no token"));

  jwt.verify(token.toString(), process.env.JWT_SECRET, (err, payload) => {
    if (err) return next(ApiError.notAuthorized(err.message));

    return next();
  });
}
