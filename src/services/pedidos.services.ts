import { Collection, ObjectId } from "mongodb";
import { EstadoPedido } from "../interfaces/types";
import { executeQuery, findById, setPedido } from "../config/db.utils";
import { agregatePedidoModel, postPedidoModel } from "../models/models";
import { pedidoFields } from "../config/collections";

class PedidoService {
  private collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  async findAll(
    limit: number,
    skip: number,
    status?: EstadoPedido,
    id?: string
  ) {
    if (id) {
      const match = [findById(id), agregatePedidoModel];
      return await this.collection.aggregate(match).toArray();
    } else {
      const query = executeQuery(
        pedidoFields.status_col_3,
        pedidoFields.last_update,
        agregatePedidoModel,
        status,
        limit,
        skip
      );

      return await this.collection.aggregate(query).toArray();
    }
  }

  async createPedido(data: any) {
    const query = postPedidoModel(data);
    return await this.collection.insertOne(query);
  }

  async updateStatus(id: string) {
    const [filter, update] = setPedido(id);
    return await this.collection.updateOne(filter, update);
  }

  async deletePedido(id: string) {
    const filter = { _id: new ObjectId(id) };
    return await this.collection.deleteOne(filter);
  }
}

export default PedidoService;
