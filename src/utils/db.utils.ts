import { ObjectId } from "mongodb";
import { AggregationStage } from "../interfaces/types";

/**
 * Constructs a MongoDB aggregation stage to match a document by its ID.
 * @param id The ID of the document to match.
 * @returns An aggregation stage to match the document by its ID.
 */
export const findone = (id: string) => {
  if (id) {
    return { $match: { _id: new ObjectId(id) } };
  } else {
    return {};
  }
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
  status?: any,
  limit?: any,
  skip?: any
): AggregationStage[] => {
  // status = status || "en proceso";
  limit = limit || "20";
  skip = skip || "0";

  const query: AggregationStage[] = [
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
    proyect,
  ];

  if (status) {
    query.splice(0, 0, {
      $match: {
        [statusfield]: status,
      },
    });
  }

  console.log(query);

  return query;
};

/**
 * Constructs a MongoDB update operation to update the status and last update fields of a document.
 * @param id The ID of the document to update.
 * @param statusField The field name representing the status in the database.
 * @param lastUpdateField The field name representing the last update date in the database.
 * @returns An array containing the filter and update operations.
 */
export const updateQuery = (
  id: ObjectId,
  statusField: any,
  lastUpdateField: any
) => {
  const filter = { _id: new ObjectId(id) };

  const update = [
    {
      $set: {
        [statusField]: "enviado",
        [lastUpdateField]: new Date(),
      },
    },
  ];

  return [filter, update];
};
