import { ObjectId } from "mongodb";
import { data_col_3 } from "../config/config";
import { agregateModel } from "../models/models";
import { AggregationStage } from "../interfaces/types";

export const findone = (id: string) => {
  if (id) {
    return [
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      agregateModel,
    ];
  } else {
    return {};
  }
};

export const executeQuery = (
  status?: any,
  limit?: any,
  skip?: any
): AggregationStage[] => {
  status = status || "en proceso";
  limit = limit || "20";
  skip = skip || "0";

  const query: AggregationStage[] = [
    {
      $match: {
        [data_col_3.status]: status,
      },
    },
    {
      $limit: parseInt(<any>limit),
    },
    {
      $skip: parseInt(<any>skip),
    },
    {
      $sort: {
        [data_col_3.date_creation]: 1,
        [data_col_3.status]: 1,
      },
    },
    agregateModel
  ];

  return query;
};


export const updateQuery = (id: ObjectId) => {
  const filter = { _id: new ObjectId(id) };

  const update = [
    {
      $set: {
        [data_col_3.status]: "enviado",
        [data_col_3.last_update]: new Date(),
      },
    },
  ];

  return [filter, update];
};
