import { Collection, ObjectId } from "mongodb";
import { data_col_3 } from "../config/config";
import { Pedido, EstadoPedido } from "../interfaces/types";

export const findFilter = (fn: EstadoPedido) => {
  if (fn) {
    return {
      [data_col_3.status]: fn,
    };
  } else {
    return {};
  }
};

export const executeQuery = async (
  col: Collection,
  filter: any,
  limit: string | undefined,
  skip: string | undefined
) => {
  let query = col.find(filter);

  if (typeof limit === "string") {
    query = query.limit(Number(limit));
  }

  if (typeof skip === "string") {
    query = query.skip(Number(skip));
  }

  const sort = {
    [data_col_3.date_creation]: 1, // Desde el más antiguo hasta el más reciente
    [data_col_3.status]: 1, // Organizado desde los
  };

  return query.sort(<any>sort).toArray();
};

export const postQuery = (body: Pedido) => {
  const query = {
    [data_col_3.set_pedido_id]: new ObjectId(body.set_pedido_id),
    [data_col_3.price]: body.price,
    [data_col_3.client_name]: body.client_name,
    [data_col_3.client_lastname]: body.client_lastname,
    [data_col_3.email]: body.email,
    [data_col_3.phone]: body.phone,
    [data_col_3.country]: body.country,
    [data_col_3["depa/state"]]: body.departament_or_state,
    [data_col_3.city]: body.city,
    [data_col_3.postal_code]: body.postal_code,
    [data_col_3.meth_pay]: body.meth_pay,
    [data_col_3.status]: body.status,
    [data_col_3.val_to_pay]: body.val_to_pay,
    [data_col_3.dirrection]: body.dirrection,
    [data_col_3.date_creation]: new Date(),
    [data_col_3.last_update]: new Date()
  };
  
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
