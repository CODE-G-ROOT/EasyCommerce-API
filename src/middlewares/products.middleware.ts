import { body, check, query } from "express-validator";
import { Double } from "mongodb";
import { EstadoProduct } from "../interfaces/types";
import { validateIfOneOrMoreFieldsExist, validateResult } from "../utils/validate.helper";
import { NextFunction, Request, Response } from "express";


const changeStringToNumber = (value: any) => {
  return Number(<Double>value);
}

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
    .customSanitizer(changeStringToNumber)
    .isDecimal({
      decimal_digits: "2",
      force_decimal: true,
    })
    .notEmpty(),
  check("offerPrice")
  .exists()
  .customSanitizer(changeStringToNumber)
  .isDecimal({
    decimal_digits: "2",
    force_decimal: true,
  })
  .notEmpty(),
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
    .isMongoId()
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
  check("status").optional().isString().isIn(["activo", "inactivo"]).notEmpty(),
  check("description").optional().isString().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export const validateIdDelited = [
  check("id").exists().isMongoId(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]