import { NextFunction, Request, Response } from "express";
import { validateResult } from "../utils/validate.helper";
import { check, query } from "express-validator";
import { Double } from "mongodb";
import { EstadoPedido, PayMethod } from "../interfaces/types";

// export const getParams = (req: Request, res: Response, next: NextFunction): void => {
//     const { limit, skip, status } = req.query;

// };

export const validationBody = [
  check("set_pedido_id").exists().isString().isBase64().not().isEmpty(),
  check("price")
    .exists()
    .isNumeric()
    .custom((value) => <Double>value)
    .not()
    .isEmpty(),
  check("client_name").exists().isString().isLength({ min: 2 }).not().isEmpty(),
  check("client_lastname")
    .exists()
    .isString()
    .isLength({ min: 2 })
    .not()
    .isEmpty(),
  check("email").exists().isEmail().not().isEmpty(),
  check("phone")
    .exists()
    .isString()
    .isLength({ min: 10, max: 15 })
    .not()
    .isEmpty(),
  check("country").exists().isString().isLength({ min: 2 }).not().isEmpty(),
  check("departament_or_state")
    .exists()
    .isString()
    .isLength({ min: 4 })
    .not()
    .isEmpty(),
  check("city").exists().isString().isLength({ min: 4 }).not().isEmpty(),
  check("postal_code")
    .exists()
    .isLength({ min: 4 })
    .isPostalCode("any")
    .not()
    .isEmpty(),
  check("meth_pay")
    .exists()
    .isString()
    .custom((value) => <PayMethod>value)
    .not()
    .isEmpty(),
  check("status")
    .exists()
    .isString()
    .custom((value) => <EstadoPedido>value)
    .not()
    .isEmpty(),
  check("val_to_pay")
    .exists()
    .isNumeric()
    .custom((value) => <Double>value)
    .not()
    .isEmpty(),
  check("dirrection").exists().isString().not().isEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export const validationParams = [
  query("limit")
    .optional()
    .isInt()
    .withMessage("The 'limit' param, must be a interger"),
  query("skip")
    .optional()
    .isInt()
    .withMessage("The 'skip' param should be a interger"),
  query("status")
    .optional()
    .isString()
    .isIn(["enviado", "en proceso"])
    .withMessage("The 'status' param, must be 'enviado' or 'en proceso'"),
  query("id")
    .optional()
    .isString()
    .isBase64()
    .withMessage("Id param must be base 64 string"),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export const postBody = () => {};

export const putParams = () => {};

export const deleteParams = () => {};
