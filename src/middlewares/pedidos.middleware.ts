import { NextFunction, Request, Response } from "express";
import { validateResult } from "../utils/validate.helper";
import { check, query } from "express-validator";
import { Double } from "mongodb";
import { EstadoPedido, PayMethod } from "../interfaces/types";

// const allowedFields = [
//   "set_pedido_id",
//   "price",
//   "client_name",
//   "client_lastname",
//   "email",
//   "phone",
//   "country",
//   "departament_or_state",
//   "city",
//   "postal_code",
//   "meth_pay",
//   "status",
//   "val_to_pay",
//   "dirrection"
// ];

export const validationBody = [
  check("set_pedido_id")
    .exists()
    .isString()
    .isMongoId()
    .notEmpty(),
  check("price")
    .exists()
    .isNumeric()
    .isDecimal({
      decimal_digits: "2",
      force_decimal: true,
    })
    .custom((value) => <Double>value)
    .notEmpty(),
  check("client_name")
    .exists()
    .isString()
    .isLength({ min: 2 })
    .not()
    .isEmpty(),
  check("client_lastname")
    .exists()
    .isString()
    .isLength({ min: 2 })
    .notEmpty(),
  check("email")
    .exists()
    .isEmail()
    .not()
    .isEmpty(),
  check("phone")
    .exists()
    .isString()
    .isLength({ min: 10, max: 15 })
    .notEmpty(),
  check("country")
    .exists()
    .isString()
    .isLength({ min: 2 })
    .notEmpty(),
  check("departament_or_state")
    .exists()
    .isString()
    .isLength({ min: 4 })
    .notEmpty(),
  check("city")
    .exists()
    .isString()
    .isLength({ min: 4 })
    .notEmpty(),
  check("postal_code")
    .exists()
    .isLength({ min: 4 })
    .isPostalCode("any")
    .notEmpty(),
  check("meth_pay")
    .exists()
    .isString()
    .custom((value) => <PayMethod>value)
    .notEmpty(),
  check("status")
    .exists()
    .isString()
    .custom((value) => <EstadoPedido>value)
    .notEmpty(),
  check("val_to_pay")
    .exists()
    .isNumeric()
    .isDecimal({
      decimal_digits: "2",
      force_decimal: true,
    })
    .custom((value) => <Double>value)
    .notEmpty(),
  check("dirrection")
    .exists()
    .isString()
    .notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export const validationParams = [
  query().notEmpty(),
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
    .isIn(["enviado", "no enviado"])
    .withMessage("The 'status' param, must be 'enviado' or 'no enviado'"),
  query("id")
    .optional()
    .isString()
    .isBase64()
    .withMessage("Id param must be base 64 string"),
  query("name")
    .optional()
    .isString()
    .withMessage("Product name param must be type string"),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
