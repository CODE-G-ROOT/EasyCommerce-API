import { Request, Response } from "express";
import MongodbConnection from "../services/mongo.services";
import { collection } from "../config/collections";
import PedidoService from "../services/pedidos.services";
import { handle500Status } from "../utils/Erros";
import {
  sendGetResponse,
  sendUpdateResponse,
  sendErrorDeleted,
  sendErrorPost,
} from "../utils/send";
import { DB, CON_STRING } from "../utils/utils";
import { EstadoPedido } from "../interfaces/types";

MongodbConnection.getIntance().connect(CON_STRING as string);
const db = MongodbConnection.getIntance().getConnection(DB!);

const validateConnection = () => {
  MongodbConnection.getIntance().ensureConnection(DB!);
};

const pedidoService = new PedidoService(db.collection(collection.pedidos));

// GET
export const findAll = async (req: Request, res: Response) => {
  try {
    const { limit, skip, status, id } = req.query;
    validateConnection();

    const results = await pedidoService.findAll(
      Number(limit),
      Number(skip),
      status as EstadoPedido,
      id as string
    );

    sendGetResponse(results, res, "Documents not found");
  } catch (error: any) {
    handle500Status(error, res);
  }
};

// POST
export const createPedido = async (req: Request, res: Response) => {
  try {
    validateConnection();

    const results = await pedidoService.createPedido(req.body);
    sendErrorPost(
      results,
      res,
      "The pedido has been created",
      "Error to create pedido"
    );
  } catch (error: any) {
    handle500Status(error, res);
  }
};

// UPDATE
export const updateStatus = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;

    validateConnection();

    const result = await pedidoService.updateStatus(id);

    sendUpdateResponse(result, res, "Document Updated", "Document don't found");
  } catch (error: any) {
    handle500Status(error, res);
  }
};

// DELETE
export const deletePedido = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    validateConnection();

    const result = await pedidoService.deletePedido(id);
    sendErrorDeleted(
      res,
      result,
      "Document has been deleted",
      "Has been a error to Delete the document"
    );
  } catch (error: any) {}
};
