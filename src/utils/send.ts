import {
  handle200Status,
  handle400Status,
  handle404Status,
  handle503Status,
} from "./Erros";
import { NextFunction, Response } from "express";
import { Document } from "mongodb";

export const sendGetResponse = (
  results: Document[],
  res: Response,
  errorMessage?: string
): void => {
  if (results.length > 0) {
    res.status(200).json(results);
  } else {
    handle404Status(res, errorMessage);
  }
};

export const sendOneResponse = (
  results: object,
  res: Response,
  errorMessage?: string
): void => {
  if (results) {
    res.status(200).json(results);
  } else {
    handle404Status(res, errorMessage);
  }
}

export const sendUpdateResponse = (
  results: any,
  res: Response,
  queryMessage?: string,
  errorMessage?: string
): void => {
  if (results.matchedCount > 0) {
    handle200Status(res, queryMessage);
  } else {
    handle404Status(res, errorMessage);
  }
};

export const sendErrorPost = (
  result: any,
  res: Response,
  queryMessage?: string,
  errorMessage?: string
) => {
  if (result.acknowledged === true) {
    
    handle200Status(res, queryMessage);
  } else {
    handle400Status(res, errorMessage);
  }
};

export const setTime = (time: number, res: Response, next: NextFunction) => {
  time = time * 1000;
  res.setTimeout(time, () => {
    handle503Status(res);
  });
  next();
};

export const sendErrorDeleted = (
  res: Response,
  result: any,
  queryMessage?: string,
  errorMessage?: string
) => {
  if (result.deletedCount === 1) {
    // Si deletedCount es 1, significa que se eliminó correctamente
    handle200Status(res, queryMessage);
  } else {
    // Si deletedCount no es 1, significa que no se eliminó ningún documento
    handle404Status(res, errorMessage);
  }
};
