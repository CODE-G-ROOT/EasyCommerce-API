import { Request, Response } from "express";
import MongodbConnection from "../services/mongo";
import { uploadImage } from "../config/cloudinary";
import { collection, data_col_3 } from "../config/collections";
import { executeQuery, findById, setPedido } from "../config/db.utils";
import { handle404Status, handle500Status } from "../utils/Erros";
import { agregatePedidoModel, postPedidoModel } from "../models/models";
import { EstadoProduct } from "../interfaces/types";
import { DB, CON_STRING } from "../utils/utils";
import {
  sendUpdateResponse,
  sendGetResponse,
  sendErrorPost,
  sendErrorDeleted,
} from "../utils/send";
import { UploadedFile } from "express-fileupload";

MongodbConnection.getIntance().connect(CON_STRING as string);
const db = MongodbConnection.getIntance().getConnection(DB!);

const validateConnection = () => {
  MongodbConnection.getIntance().ensureConnection(DB!);
};

// GET
export const findAll = async (req: Request, res: Response) => {
  try {
    const { limit, skip, status, id } = req.query;

    let results = null;

    validateConnection();
    const col = await db.collection(collection.pedidos);

    if (id) {
      const match = [findById(<string>id), agregatePedidoModel];
      results = await col.aggregate(match).toArray();
      return sendGetResponse(results, res, "Document not found");
    } else {
      const query = executeQuery(
        [data_col_3.status_col_3],
        [data_col_3.last_update],
        agregatePedidoModel,
        <EstadoProduct>status,
        limit,
        skip
      );

      results = await col.aggregate(query).toArray();
    }

    sendGetResponse(<any>results, res, "No documents to show"); // send response and error 404 handle
  } catch (error: any) {
    handle500Status(error, res); // handle error
  }
};

// POST
export const createPedido = async (req: Request, res: Response) => {
  try {
    validateConnection();

    const col = await db.collection(collection.pedidos);

    if (!req.files || !req.files.image) {
      handle404Status(res, "No files uploaded")
    }

    if (!Array.isArray(req.files?.image)) {
      const img = (req.files?.image as UploadedFile).tempFilePath;
      console.log(img);
      const a = await uploadImage(img);
      console.log(a);
    
    } else {
      const images = req.files.image as UploadedFile[];
      for (const file of images) {
        const img = file.tempFilePath;
        console.log(img);
        const result = await uploadImage(img);
        console.log(result);
      }
    }

    const query = postPedidoModel(req.body);

    const result = await col.insertOne(query);

    sendErrorPost(
      result,
      res,
      "The pedido has been created",
      "Error to create the pedido"
    );
  } catch (error: any) {
    handle500Status(error, res);
  }
};

// PUT
export const updateStatus = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;

    const [filter, update] = setPedido(id);

    validateConnection();

    const col = await db.collection(collection.pedidos);

    const result = await col.updateOne(filter, update);

    sendUpdateResponse(result, res, "Document updated", "Document don't found");
  } catch (error: any) {
    handle500Status(error, res);
  }
};

export const deletePedido = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;

    validateConnection();

    const col = await db.collection(collection.pedidos);
    const result = await col.deleteOne(id);

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
