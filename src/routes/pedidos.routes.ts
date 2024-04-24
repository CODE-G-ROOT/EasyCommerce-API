import { Router } from "express";
import {
  findAll,
  createPedido,
  updateStatus,
  deletePedido,
} from "../controllers/pedidos.controller";

const pedido = Router();

/*
    TODO -> LOS PEDIDOS DEBEN CONTENER LOS SIGUIENTES FILTROS:
        - Por fecha de ultima actualización
*/

pedido.get("/", findAll);
pedido.post("/", createPedido);
pedido.put("/", updateStatus);
pedido.delete("/", deletePedido);

export default pedido;
