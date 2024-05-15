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

export const validateIfOneOrMoreFieldsExist = (value: object, allowedFields: string[]) => {

  let countMatchingFields = 0; // Contador para campos coincidentes
  
  for (const field in value) {
    if (allowedFields.includes(field)) {
      countMatchingFields++; // Incrementar el contador si el campo es permitido
    } else {
      return false; 
    }
  }
  
  return countMatchingFields > 0;
}
