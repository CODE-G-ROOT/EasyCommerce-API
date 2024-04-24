import dotenv from "dotenv";

dotenv.config();

export const { SERVER_CONFIG, CON_STRING, DB, CAMPOS_DB } = process.env!;
export const pedidos_collection = JSON.parse(CAMPOS_DB!);
const {
  COLLECTION1,
  COLLECTION3,
  CMP1_COLLECTION1,
  CMP3_COLLECTION1,
  CMP4_COLLECTION1,
  CMP5_COLLECTION1,
  CMP6_COLLECTION1,
  CMP1_COLLECTION3,
  CMP2_COLLECTION3,
  CMP3_COLLECTION3,
  CMP4_COLLECTION3,
  CMP5_COLLECTION3,
  CMP6_COLLECTION3,
  CMP7_COLLECTION3,
  CMP8_COLLECTION3,
  CMP9_COLLECTION3,
  CMP10_COLLECTION3,
  CMP11_COLLECTION3,
  CMP12_COLLECTION3,
  CMP13_COLLECTION3,
  CMP14_COLLECTION3,
  CMP15_COLLECTION3,
  CMP16_COLLECTION3,
} = pedidos_collection;

export const collection = {
  products: COLLECTION1,
  pedidos: COLLECTION3,
};

export const data_col_1 = {
  pack_name: CMP1_COLLECTION1,
  price: CMP3_COLLECTION1,
  offert: CMP4_COLLECTION1,
  img: CMP5_COLLECTION1,
  status: CMP6_COLLECTION1,
};

export const data_col_3 = {
  set_pedido_id: CMP1_COLLECTION3,
  price: CMP2_COLLECTION3,
  client_name: CMP3_COLLECTION3,
  client_lastname: CMP4_COLLECTION3,
  email: CMP5_COLLECTION3,
  phone: CMP6_COLLECTION3,
  country: CMP7_COLLECTION3,
  "depa/state": CMP8_COLLECTION3,
  city: CMP9_COLLECTION3,
  postal_code: CMP10_COLLECTION3,
  meth_pay: CMP11_COLLECTION3,
  status: CMP12_COLLECTION3,
  val_to_pay: CMP13_COLLECTION3,
  dirrection: CMP14_COLLECTION3,
  date_creation: CMP15_COLLECTION3,
  last_update: CMP16_COLLECTION3,
};

const server = JSON.parse(SERVER_CONFIG!);
export const { host, port } = server;
