import {
  handle200Status,
  handle400Status,
  handle404Status,
  handle503Status,
} from "./Erros";
import { NextFunction, Response } from "express";
import { Document } from "mongodb";

/**
 * Sends a response with the retrieved documents in case of a successful GET request.
 * @param results The array of documents retrieved from the database.
 * @param res The response object to send the response.
 * @param errorMessage Optional. The error message to send in case no documents are found.
 */
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

/**
 * Sends a response after an update operation.
 * @param results The result of the update operation.
 * @param res The response object to send the response.
 * @param queryMessage Optional. The success message to send in case of a successful update.
 * @param errorMessage Optional. The error message to send in case the update operation fails.
 */
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

/**
 * Sends a response after a POST request.
 * @param result The result of the POST operation.
 * @param res The response object to send the response.
 * @param queryMessage Optional. The success message to send in case of a successful POST operation.
 * @param errorMessage Optional. The error message to send in case the POST operation fails.
 */
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

/**
 * Sets a timeout for the response.
 * @param time The time in seconds to set the timeout for the response.
 * @param res The response object to set the timeout on.
 * @param next The next function in the middleware chain.
 */
export const setTime = (time: number, res: Response, next: NextFunction) => {
  time = time * 1000;
  res.setTimeout(time, () => {
    handle503Status(res);
  });
  next();
};

/**
 * Sends a response after a delete operation.
 * @param res The response object to send the response.
 * @param result The result of the delete operation.
 * @param queryMessage Optional. The success message to send in case of a successful delete operation.
 * @param errorMessage Optional. The error message to send in case the delete operation fails.
 */
export const sendErrorDeleted = (
  res: Response,
  result: any,
  queryMessage?: string,
  errorMessage?: string
) => {
  if (result.deletedCount === 1) {
    handle200Status(res, queryMessage);
  } else {
    handle404Status(res, errorMessage);
  }
};
