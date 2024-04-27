import dotenv from "dotenv";
import MongodbConnection from "../config/mongo";
import { Response, Request } from "express";
import { collection, data_col_1, DB } from "../config/config";
import { sendGetResponse } from "../utils/send";
import { handle500Status } from "../utils/Erros";
import { executeQuery, findone } from "../utils/db.utils";
import { agregateProductModel } from "../models/models";

dotenv.config();

const CON_STRING = process.env.CON_STRING!;
MongodbConnection.getIntance().connect(CON_STRING);
const db = MongodbConnection.getIntance().getConnection(DB!);

export const findAll = async (req: Request, res: Response) => {
  try {
    const { limit, skip, status, id } = req.query;
    let results = null;

    const col = await db.collection(collection.products);

    if (id) {
      const match = [findone(<string>id), agregateProductModel];
      results = await col.aggregate(match).toArray();

      return sendGetResponse(results, res, "Document not found");
    } else {
      const query = executeQuery(
        [data_col_1.status],
        [data_col_1.lastUpdate],
        agregateProductModel,
        status,
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

// // POST
// export const createPedido = async (req: Request, res: Response) => {
//   try {
//     const col = await db.collection(collection.pedidos);

//     const query = postPedidoModel(req.body);

//     const result = await col.insertOne(query);

//     sendErrorPost(
//       result,
//       res,
//       "The pedido has been created",
//       "Error to create the pedido"
//     );
//   } catch (error: any) {
//     handle500Status(error, res);
//   }
// };

// // PUT
// export const updateStatus = async (req: Request, res: Response) => {
//   try {
//     const id = req.query.id as string;

//     const objectId = new ObjectId(id);

//     const [filter, update] = updateQuery(objectId);

//     const col = await db.collection(collection.pedidos);
//     const result = await col.updateOne(filter, update);
//     console.log(result);

//     sendUpdateResponse(result, res, "Document updated", "Document don't found");
//   } catch (error: any) {
//     handle500Status(error, res);
//   }
// };

// export const deletePedido = async (req: Request, res: Response) => {
//   try {
//     const id = req.query.id as string;

//     const objectId = {
//       _id: new ObjectId(id),
//     };

//     const col = await db.collection(collection.pedidos);
//     const result = await col.deleteOne(objectId);

//     sendErrorDeleted(
//       res,
//       result,
//       "The document has been deleted",
//       "Has been a error to delete the document"
//     );
//   } catch (error: any) {
//     handle500Status(error, res);
//   }
// };
