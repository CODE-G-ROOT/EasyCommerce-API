import { Collection, ObjectId } from "mongodb";
import { EstadoProduct } from "../interfaces/types";
import {
  executeQuery,
  findById,
  findByName,
  setProduct,
} from "../config/db.utils";
import { agregateProductModel, postProductModel } from "../models/models";
import { productFields } from "../config/collections";
import { handleFileUpload } from "../config/cloudinary";

class ProductService {
  private collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  async findAll(
    limit: number,
    skip: number,
    name?: string,
    status?: EstadoProduct,
    id?: string
  ) {
    if (id) {
      const match = [findById(id), agregateProductModel];
      return await this.collection.aggregate(match).toArray();
    }

    if (name) {
      const match = [
        findByName(name, <any>[productFields.pack_name]),
        agregateProductModel,
      ];
      return await this.collection.aggregate(match).toArray();
    }

    const query = executeQuery(
      productFields.status,
      productFields.lastUpdate,
      agregateProductModel,
      status,
      skip,
      limit
    );

    return await this.collection.aggregate(query).toArray();
  }

  async createProduct(name: string, data: any) {
    const existProduct = await this.collection.findOne({
      [productFields.pack_name]: name,
    });

    if (existProduct) return null;

    const files = await handleFileUpload(data);
    const query = postProductModel(data.body, files);

    return await this.collection.insertOne(query);
  }

  async updateProduct(id: string, body: any) {
    const [filter, update] = setProduct(id, body);
    return await this.collection.updateOne(filter, update);
  }

  async deleteProduct(id: string) {
    const objectId = {
      _id: new ObjectId(id),
    };

    return await this.collection.deleteOne(objectId);
  }
}

export default ProductService;
