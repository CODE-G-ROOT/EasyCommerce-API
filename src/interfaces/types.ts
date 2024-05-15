import { Double, ObjectId } from "mongodb";

export type EstadoPedido = "enviado" | "validando" | "incidencia";
export type EstadoProduct = "activo" | "inactivo";
export type PayMethod = "ContraEntega" | "Tarjeta Crédito/Débito";
export type AggregationStage = {
  [key: string]: any;
};

export type Pedido = {
  set_pedido_id: ObjectId;
  price: Double;
  client_name: string;
  client_lastname: string;
  email: string;
  phone: number;
  country: string;
  departament_or_state: string;
  city: string;
  postal_code: string;
  meth_pay: PayMethod;
  status: string;
  val_to_pay: Double;
  dirrection: string;
  date_creation: Date;
  last_update: Date;
};

export type Product = {
  product_name: string;
  priceByUnit: Double;
  offerPrice: Double;
  status: EstadoProduct;
  img: string;
  description: string;
  creationDate: Date;
  lastUpdate: Date;
};
