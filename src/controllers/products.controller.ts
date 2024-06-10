import { collection } from "../config/collections";
import { Request, Response } from "express";
import {
  sendErrorDeleted,
  sendErrorPost,
  sendGetResponse,
  sendUpdateResponse,
} from "../utils/send";
import { EstadoProduct } from "../interfaces/types";
import { duplicateKey, handle302Status, handle500Status } from "../utils/Erros";
import MongodbConnection from "../services/mongo.services";
import { CON_STRING, DB } from "../utils/utils";
import ProductService from "../services/products.servces";

MongodbConnection.getIntance().connect(CON_STRING as string);
const db = MongodbConnection.getIntance().getConnection(DB!);

const validateConnection = () => {
  MongodbConnection.getIntance().ensureConnection(DB!);
};

const productService = new ProductService(db.collection(collection.products));

export const findAll = async (req: Request, res: Response) => {
  try {
    validateConnection();
    const { limit, skip, status, id, name } = req.query;

    const results = await productService.findAll(
      Number(limit),
      Number(skip),
      name as string,
      status as EstadoProduct,
      id as string
    );

    sendGetResponse(results, res, "Documents not found");
  } catch (error: any) {
    handle500Status(error, res);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    validateConnection();

    const product_name = req.body.product_name.toLowerCase();

    const results = await productService.createProduct(product_name, req);

    if (results === null) return handle302Status(
      res,
      `${req.body.product_name} product already exist.`
    );

    sendErrorPost(results, res);
  } catch (error: any) {
    const message = error.message.split(" ");
    if (message[0] === duplicateKey) handle302Status(res);
    else handle500Status(error, res);
    /* PROBAR EN CASO DE ERROR */
    // console.dirxml(error.errInfo.details.schemaRulesNotSatisfied[0]);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const body: any = req.body;

    // ! NO ACTUALIZAR IMAGENES ---> AÚN NO SE HA AGREGADO ESA FEATURE
    const result = await productService.updateProduct(id, body);
    sendUpdateResponse(result, res, "Document updated", "Document don't found");
  } catch (error: any) {
    handle500Status(error, res);
    // ↓ USAR EN CASO DE ERROR  
    // console.dirxml(
    //   error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0]
    //     .details
    // );
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;

    validateConnection();

    const result = await productService.deleteProduct(id);

    sendErrorDeleted(
      res,
      result,
      "The document has been deleted",
      "Has been a error to delete the document"
    );
  } catch (error: any) {
    const message = error.message.split(" ");
    if (message[0] === duplicateKey) handle302Status(res);
    else handle500Status(error, res);
    // console.dirxml(error.errInfo.details.schemaRulesNotSatisfied[0]);
  }
};


