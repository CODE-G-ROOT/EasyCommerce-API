import { Router } from "express";
import {
  findAll,
  createPedido,
  updateStatus,
  deletePedido,
} from "../controllers/pedidos.controller";
import {
  validationBody,
  validationParams,
} from "../middlewares/pedidos.middleware";

const pedido = Router();

pedido.get("/", validationParams, findAll);
pedido.post("/", validationBody, createPedido);
pedido.put("/", updateStatus);
pedido.delete("/", deletePedido);

export default pedido;
