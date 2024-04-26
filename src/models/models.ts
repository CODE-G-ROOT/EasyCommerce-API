import { ObjectId } from "mongodb";
import { data_col_3 } from "../config/config";
import { Pedido } from "../interfaces/types";

export const postModel = (body: Pedido) => {
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
    [data_col_3.last_update]: new Date(),
  };

  return query;
};

export const agregateModel = {
  $project: {
    id: "$_id",
    _id: 0,
    set_pedido_id: `$${[data_col_3.set_pedido_id]}`,
    price: `$${[data_col_3.price]}`,
    client_name: `$${[data_col_3.client_name]}`,
    client_lastname: `$${[data_col_3.client_lastname]}`,
    email: `$${[data_col_3.email]}`,
    phone: `$${[data_col_3.phone]}`,
    country: `$${[data_col_3.country]}`,
    city: `$${[data_col_3.city]}`,
    postal_code: `$${[data_col_3.postal_code]}`,
    meth_pay: `$${[data_col_3.meth_pay]}`,
    status: `$${[data_col_3.status]}`,
    val_to_pay: `$${[data_col_3.val_to_pay]}`,
    dirrection: `$${[data_col_3.dirrection]}`,
    date_creation: `$${[data_col_3.date_creation]}`,
    last_update: `$${[data_col_3.last_update]}`,
  },
};
