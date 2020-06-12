import { NextFunction, Request, Response } from "express";
import AppError from "../err";

export default function (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return response.status(err.status).json({
      status: "error",
      message: err.msg,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}
