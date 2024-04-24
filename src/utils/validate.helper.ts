import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { handle400Status } from "./Erros";

export const validateResult = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    validationResult(req).throw();
    next();
  } catch (error: any) {
    handle400Status(res, { errors: error.array() });
  }
};

