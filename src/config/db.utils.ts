import { ObjectId } from "mongodb";
import { AggregationStage, EstadoPedido, EstadoProduct } from "../interfaces/types";
import { pedidoFields, productFields } from "./collections";


const createMatchStage = (field: string, value: any) => {
  if (value) return { $match: { [field]: value } };
  return {};
};

const createStatusMatchStage = (statusField: string, status?: EstadoProduct): AggregationStage[] => {
  if(status) return [{ $match: { [statusField] : status }}];
  return []
};

const createSortStage = (statusField: string, lastUpateField: string): AggregationStage => ({
  $sort: {
    [lastUpateField] : 1,
    [statusField]: 1
  }
});

const createLimitStage = (limit: number): AggregationStage => ({$limit: limit});
const createSkipStage = (skip: number): AggregationStage => ({ $skip: skip });

export const findByName = (name: string, field: string) => createMatchStage(field, name?.toLocaleLowerCase());
export const findById = (id: string) => createMatchStage("_id", new ObjectId(id));


/**
 * Constructs a MongoDB aggregation pipeline for executing a query.
 * @param statusfield The field name representing the status in the database.
 * @param lastUpdatefield The field name representing the last update date in the database.
 * @param project The projection stage to be added to the pipeline.
 * @param status Optional. The status value to filter the documents.
 * @param limit Optional. The maximum number of documents to return.
 * @param skip Optional. The number of documents to skip.
 * @returns An array of aggregation stages representing the query pipeline.
 */
export const executeQuery = (
  statusfield: any,
  lastUpdatefield: any,
  project: any,
  status?: EstadoProduct,
  limit?: number,
  skip?: number
): AggregationStage[] => [
  ...createStatusMatchStage(statusfield, status),
  createLimitStage(limit? limit : 20),
  createSkipStage(skip? skip : 0),
  createSortStage(statusfield, lastUpdatefield),
  project
];

export const setPedido = (id: string): [Record<string, any>, AggregationStage[]] => {
  const updateStatus: EstadoPedido = "enviado";
  const filter = { _id: new ObjectId(id) };

  const update = [
    {
      $set: {
        [pedidoFields.status_col_3]: updateStatus,
        [pedidoFields.last_update]: new Date(),
      },
    },
  ];

  return [filter, update];
};

/**
 * Constructs a MongoDB update operation to update a product document.
 * @param id The ID of the product to update.
 * @param body The body containing product fields to update.
 * @returns An array containing the filter and update operations.
*/
export const setProduct = (id: string, body: Record<string, any>): [Record<string, any>, AggregationStage[]] => {
  const filter = { _id: new ObjectId(id) };

  const { product_name, priceByUnit, offerPrice, status, img, description } = body;

  let data: Record<string, any> = {};

  if (product_name) data[productFields.pack_name] = product_name;
  if (priceByUnit) data[productFields.price] = priceByUnit;
  if (offerPrice) data[productFields.offert] = offerPrice;
  if (status) data[productFields.status] = status;
  if (img) data[productFields.img] = img;
  if (description) data[productFields.description] = description ;

  data[productFields.creationDate] = new Date();

  const update = [
    {
      $set: data,
    },
  ];
  return [filter, update];
};
