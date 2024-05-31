import { Response } from "express";

export const duplicateKey = "E11000";

export const handle200Status = (res: Response, message?: string) => {
  res.status(200).json({
    status: 200,
    message: message ? message : "Procedure successfully completed",
  });
};

export const handle201Status = (res: Response) => {
  res.status(201).json({
    status: 201,
    message: "Product has been sucessfully created",
  });
};

export const handle302Status = (res: Response, message?: string) => {
  res.status(302).json({
    status: 302,
    message: message ? message : "This document already exist",
  });
};

export const handle304Status = (res: Response, message?: string) => {
  res.status(304).json({
    status: 304,
    message: message ? message : "Not modified",
  });
};

export const handle400Status = (res: Response, message?: string | object) => {
  res.status(400).json({
    status: 400,
    message: message ? message : "Bad Request",
  });
};

export const handle404Status = (res: Response, message?: string) => {
  res.status(404).json({
    status: 404,
    message: message ? message : "Not found",
  });
};

export const handle500Status = (error: any, res: Response) => {
  console.error(
    "Error interno del servidor:",
    error
    // error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].details
  );

  res.status(500).json({
    status: 500,
    message: error.message,
  });
};

export const handle503Status = (res: Response) => {
  res.status(503).json({
    status: 503,
    message: "Tiempo de espera excedido",
  });
};
