import { body, check, query } from "express-validator";
import { Double } from "mongodb";
import { EstadoProduct } from "../interfaces/types";
import { validateIfOneOrMoreFieldsExist, validateResult } from "../utils/validate.helper";
import { NextFunction, Request, Response } from "express";
import { ChainCondition } from "express-validator/src/context-items";

// {
//     "product_name": "Tonico Mechudos",
//     "priceByUnit": 15.99,
//     "offerPrice": 11.99,
//     "status": "activo",
//     "description": "hola"
// }

const allowedFields = [
  "product_name",
  "priceByUnit",
  "offerPrice",
  "status",
  "img",
  "description",
]

export const validationProduct = [
  check("product_name").exists().isString().notEmpty(),
  check("priceByUnit")
    .exists()
    .isNumeric()
    .isDecimal({
      decimal_digits: "2",
      force_decimal: true,
    })
    .custom((value) => <Double>value)
    .notEmpty(),
  check("offerPrice")
    .exists()
    .isNumeric()
    .isDecimal({
      decimal_digits: "2",
      force_decimal: true,
    })
    .custom((value) => <Double>value)
    .notEmpty(),
  check("img").exists().isString().notEmpty(),
  check("status")
    .exists()
    .isString()
    .custom((value) => <EstadoProduct>value)
    .notEmpty(),
  check("description").exists().isString().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export const validationPUTProduct = [
  query("id")
    .exists()
    .isString()
    .isBase64()
    .withMessage("Id param must be base 64 string"),
  body().custom(value => validateIfOneOrMoreFieldsExist(value, allowedFields)).notEmpty(),
  check("product_name").optional().isString().notEmpty(),
  check("priceByUnit")
    .optional()
    .isNumeric()
    .isDecimal({
      decimal_digits: "2",
      force_decimal: true,
    })
    .custom((value) => <Double>value)
    .notEmpty(),
  check("offerPrice")
    .optional()
    .isNumeric()
    .isDecimal({
      decimal_digits: "2",
      force_decimal: true,
    })
    .custom((value) => <Double>value)
    .notEmpty(),
  check("img").optional().isString().notEmpty(),
  check("status").optional().isString().isIn(["activo", "inactivo"]).notEmpty(),
  check("description").optional().isString().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export const validateIdDelited = [
  check("id").exists().isBase64().isMongoId(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]