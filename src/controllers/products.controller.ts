import dotenv from "dotenv";
import MongodbConnection from "../services/mongo";
import { Response, Request } from "express";
import { collection, productFields } from "../config/collections";
import {
  sendErrorDeleted,
  sendErrorPost,
  sendGetResponse,
  sendUpdateResponse,
} from "../utils/send";
import { duplicateKey, handle302Status, handle500Status } from "../utils/Erros";
import {
  executeQuery,
  findById,
  findByName,
  setProduct,
} from "../config/db.utils";
import { agregateProductModel, postProductModel } from "../models/models";
import { EstadoProduct } from "../interfaces/types";
import { ObjectId } from "mongodb";
import { DB } from "../utils/utils";
import { handleFileUpload } from "../config/cloudinary";

dotenv.config();

const CON_STRING = process.env.CON_STRING!;
MongodbConnection.getIntance().connect(CON_STRING);

const db = MongodbConnection.getIntance().getConnection(DB!);

const validateConnection = () => {
  MongodbConnection.getIntance().ensureConnection(DB!);
};

export const findAll = async (req: Request, res: Response) => {
  try {
    validateConnection();

    const { limit, skip, status, id, name } = req.query;
    
    let results = null;

    const col = await db.collection(collection.products);

    if (id) {
      const match = [findById(<string>id), agregateProductModel];
      results = await col.aggregate(match).toArray();

      return sendGetResponse(results, res, "Document not found");
    }

    if (name) {
      const Name = <string>name;
      const Field = <any>[productFields.pack_name];
      const match = [findByName(Name, Field), agregateProductModel];

      results = await col.aggregate(match).toArray();
      return sendGetResponse(results, res, "Document not found");
    }

    const query = executeQuery(
      [productFields.status],
      [productFields.lastUpdate],
      agregateProductModel,
      <EstadoProduct>status,
      Number(limit),
      Number(skip)
    );

    results = await col.aggregate(query).toArray();

    sendGetResponse(<any>results, res, "No documents to show"); // send response and error 404 handle
  } catch (error: any) {
    handle500Status(error, res); // handle error
  }
};

// POST
export const createProduct = async (req: Request, res: Response) => {
  try {
    validateConnection();
    const col = await db.collection(collection.products);

    const productname = req.body.product_name.toLowerCase();

    const existProduct = await col.findOne({
      [productFields.pack_name]: productname,
    });

    if (existProduct !== null) {
      return handle302Status(
        res,
        `${req.body.product_name} product already exist.`
      );
    }

    const files = await handleFileUpload(req);
    const query = postProductModel(req.body, files);

    const result = await col.insertOne(query);
    sendErrorPost(result, res);
  } catch (error: any) {
    const message = error.message.split(" ");
    if (message[0] === duplicateKey) handle302Status(res);
    else handle500Status(error, res);
    // console.dirxml(error.errInfo.details.schemaRulesNotSatisfied[0]);
  }
};

// PUT
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const body: any = req.body;

    // ! NO ACTUALIZAR IMAGENES ---> AÚN NO SE HA AGREGADO ESA FEATURE

    const [filter, update] = setProduct(id, body);

    validateConnection();
    const col = await db.collection(collection.products);

    const result = await col.updateOne(filter, update);

    sendUpdateResponse(result, res, "Document updated", "Document don't found");
  } catch (error: any) {
    handle500Status(error, res);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;

    const objectId = {
      _id: new ObjectId(id),
    };

    validateConnection();
    const col = await db.collection(collection.products);
    
    const result = await col.deleteOne(objectId);

    sendErrorDeleted(
      res,
      result,
      "The document has been deleted",
      "Has been a error to delete the document"
    );
  } catch (error: any) {
    handle500Status(error, res);
  }
};
