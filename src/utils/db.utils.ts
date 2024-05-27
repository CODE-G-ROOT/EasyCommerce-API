import { ObjectId } from "mongodb";
import { AggregationStage, EstadoPedido, EstadoProduct } from "../interfaces/types";
import { data_col_1, data_col_3 } from "../config/collections";

/**
 * Constructs a MongoDB aggregation stage to match a document by its ID.
 * @param id The ID of the document to match.
 * @returns An aggregation stage to match the document by its ID.
 */
export const findById = (id: string) => {
  if (id) {
    return { $match: { _id: new ObjectId(id) } };
  }
  return {};
};

/**
 * Constructs a MongoDB aggregation stage to match a document by its Name.
 * @param name The Name of the product to match.
 * @returns An aggregation stage to match the document by its name.
 */
export const findByName = (name: string, field: string) => {
  if (name) {
    name = name.toLowerCase();
    return { $match: { [field]: name } };
  }

  return {};
};

/**
 * Constructs a MongoDB aggregation pipeline for executing a query.
 * @param statusfield The field name representing the status in the database.
 * @param lastUpdatefield The field name representing the last update date in the database.
 * @param proyect The proyect stages to be added to the pipeline.
 * @param status Optional. The status value to filter the documents.
 * @param limit Optional. The maximum number of documents to return.
 * @param skip Optional. The number of documents to skip.
 * @returns An array of aggregation stages representing the query pipeline.
 */
export const executeQuery = (
  statusfield: any,
  lastUpdatefield: any,
  proyect: any,
  status?: EstadoProduct,
  limit?: any,
  skip?: any
): AggregationStage[] => {
  limit = limit || "20";
  skip = skip || "0";

  let query: AggregationStage[] = [];

  const match = {
    $match: {
      [statusfield]: status,
    },
  };

  if (status) query.push(match);

  query.push(
    {
      $limit: parseInt(<any>limit),
    },
    {
      $skip: parseInt(<any>skip),
    },
    {
      $sort: {
        [lastUpdatefield]: 1,
        [statusfield]: 1,
      },
    },
    proyect
  );

  return query;
};

/**
 * Constructs a MongoDB update operation to update the status and last update fields of a document.
 * @param id The ID of the document to update.
 * @param statusField The field name representing the status in the database.
 * @param lastUpdateField The field name representing the last update date in the database.
 * @returns An array containing the filter and update operations.
 */
export const setPedido = (id: string) => {
  const updateStatus: EstadoPedido = "enviado";
  const filter = { _id: new ObjectId(id) };

  const update = [
    {
      $set: {
        [data_col_3.status_col_3]: updateStatus,
        [data_col_3.last_update]: new Date(),
      },
    },
  ];

  return [filter, update];
};

export const setProduct = (id: string, body: any) => {
  const filter = { _id: new ObjectId(id) };

  const { product_name, priceByUnit, offerPrice, status, img, description } =
    body;

  let data = {};

  if (product_name) data = { [data_col_1.pack_name]: product_name };
  else if (priceByUnit) data = { ...data, [data_col_1.price]: priceByUnit };
  else if (offerPrice) data = { ...data, [data_col_1.offert]: offerPrice };
  else if (status) data = { ...data, [data_col_1.status]: status };
  else if (img) data = { ...data, [data_col_1.img]: img };
  else if (description)
    data = { ...data, [data_col_1.description]: description };
  data = { ...data, [data_col_1.creationDate]: new Date() };

  const update = [
    {
      $set: data,
    },
  ];
  return [filter, update];
};
