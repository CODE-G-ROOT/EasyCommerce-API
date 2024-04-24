import { Request, Response } from "express";
import dotenv from "dotenv";
import MongodbConnection from "../config/mongo";
import { collection, DB } from "../config/config";
import {
  sendUpdateResponse,
  sendGetResponse,
  sendErrorPost,
  sendErrorDeleted,
  sendOneResponse,
} from "../utils/send";
import {
  executeQuery,
  findone,
  postQuery,
  updateQuery,
} from "../utils/db.utils";
import { handle500Status } from "../utils/Erros";
import { ObjectId } from "mongodb";

dotenv.config();

// Establecimiento de conexión con la base de datos
const CON_STRING = process.env.CON_STRING!;
MongodbConnection.getIntance().connect(CON_STRING);
const db = MongodbConnection.getIntance().getConnection(DB!);

// GET
export const findAll = async (req: Request, res: Response) => {
  try {
    const { limit, skip, status, id } = req.query;
    let results = null;

    const col = await db.collection(collection.pedidos);
    if (id) {
      results = await col.findOne(findone(<string>id));
      if (!results) {
        return  sendOneResponse(results, res, "Document not found")
      }
      console.log(results);
      return sendOneResponse(results, res);
    }

    results = await executeQuery(
      col,
      status,
      <string>limit,
      <string>skip
    );

    console.log(results);
    

    sendGetResponse(<any>results, res, "No documents to show"); // send response and error 404 handle
  } catch (error: any) {
    handle500Status(error, res); // handle error
  }
};

// POST
export const createPedido = async (req: Request, res: Response) => {
  try {
    const col = await db.collection(collection.pedidos);

    const query = postQuery(req.body);

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

    const objectId = new ObjectId(id);

    const [filter, update] = updateQuery(objectId);

    const col = await db.collection(collection.pedidos);
    const result = await col.updateOne(filter, update);
    console.log(result);

    sendUpdateResponse(result, res, "Document updated", "Document don't found");
  } catch (error: any) {
    handle500Status(error, res);
  }
};

export const deletePedido = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;

    const objectId = {
      _id: new ObjectId(id),
    };

    const col = await db.collection(collection.pedidos);
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
