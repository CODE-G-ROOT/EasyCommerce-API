import { ObjectId } from "mongodb";
import { productFields, pedidoFields } from "../config/collections";
import { Pedido, Product } from "../interfaces/types";

export const postPedidoModel = (body: Pedido) => {
  const query = {
    [pedidoFields.set_pedido_id]: new ObjectId(body.set_pedido_id),
    [pedidoFields.price]: body.price,
    [pedidoFields.client_name]: body.client_name,
    [pedidoFields.client_lastname]: body.client_lastname,
    [pedidoFields.email]: body.email,
    [pedidoFields.phone]: body.phone,
    [pedidoFields.country]: body.country,
    [pedidoFields["DepState"]]: body.departament_or_state,
    [pedidoFields.city]: body.city,
    [pedidoFields.postal_code]: body.postal_code,
    [pedidoFields.meth_pay]: body.meth_pay,
    [pedidoFields.status_col_3]: body.status,
    [pedidoFields.val_to_pay]: body.val_to_pay,
    [pedidoFields.dirrection]: body.dirrection,
    [pedidoFields.date_creation]: new Date(),
    [pedidoFields.last_update]: new Date(),
  };

  return query;
};

export const agregatePedidoModel = {
  $project: {
    id: "$_id",
    _id: 0,
    set_pedido_id: `$${[pedidoFields.set_pedido_id]}`,
    price: `$${[pedidoFields.price]}`,
    client_name: `$${[pedidoFields.client_name]}`,
    client_lastname: `$${[pedidoFields.client_lastname]}`,
    email: `$${[pedidoFields.email]}`,
    phone: `$${[pedidoFields.phone]}`,
    country: `$${[pedidoFields.country]}`,
    city: `$${[pedidoFields.city]}`,
    postal_code: `$${[pedidoFields.postal_code]}`,
    meth_pay: `$${[pedidoFields.meth_pay]}`,
    status: `$${[pedidoFields.status_col_3]}`,
    val_to_pay: `$${[pedidoFields.val_to_pay]}`,
    dirrection: `$${[pedidoFields.dirrection]}`,
    date_creation: `$${[pedidoFields.date_creation]}`,
    last_update: `$${[pedidoFields.last_update]}`,
  },
};

export const postProductModel = (body: Product, file: object) => {
  const query = {
    [productFields.pack_name]: body.product_name.toLowerCase(),
    [productFields.price]: body.priceByUnit,
    [productFields.offert]: body.offerPrice,
    [productFields.status]: body.status,
    [productFields.img]: file,
    [productFields.description]: body.description,
    [productFields.creationDate]: new Date(),
    [productFields.lastUpdate]: new Date(),
  };

  return query;
};

export const agregateProductModel = {
  $project: {
    id: "$_id",
    _id: 0,
    product_name: `$${[productFields.pack_name]}`,
    priceByUnit: `$${[productFields.price]}`,
    offerPrice: `$${[productFields.offert]}`,
    status: `$${[productFields.status]}`,
    img: `$${[productFields.img]}`,
    description: `$${[productFields.description]}`,
    creationDate: `$${[productFields.creationDate]}`,
    lastUpdate: `$${[productFields.lastUpdate]}`,
  }
};
