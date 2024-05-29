import { pedidos_collection } from "../utils/utils";

const {
  PRODUCTS_COLLECTION,
  PEDIDOS_COLLECTION,
  CMP_PR_PACK_NAME,
  CMP_PR_PRICE,
  CMP_PR_OFFER,
  CMP_PR_IMG,
  CMP_PR_STATUS,
  CMP_PR_DESCRIPTION,
  CMP_PR_CREATION_DATE,
  CMP_PR_LAST_UPDATE,
  CMP_PE_SET_PEDIDO_ID,
  CMP_PE_PRICE,
  CMP_PE_CLIENT_NAME,
  CMP_PE_CLIENT_LASTNAME,
  CMP_PE_EMAIL,
  CMP_PE_PHONE,
  CMP_PE_COUNTRY,
  CMP_PE_DEPA_STATE,
  CMP_PE_CITY,
  CMP_PE_POSTAL_CODE,
  CMP_PE_METH_PAY,
  CMP_PE_STATUS_COL_3,
  CMP_PE_VAL_TO_PAY,
  CMP_PE_DIRRECTION,
  CMP_PE_DATE_CREATION,
  CMP_PE_LAST_UPDATE,
} = pedidos_collection;

export const collection = {
  products: PRODUCTS_COLLECTION,
  pedidos: PEDIDOS_COLLECTION,
};

export const productFields = {
  pack_name: CMP_PR_PACK_NAME,
  price: CMP_PR_PRICE,
  offert: CMP_PR_OFFER,
  img: CMP_PR_IMG,
  status: CMP_PR_STATUS,
  description: CMP_PR_DESCRIPTION,
  creationDate: CMP_PR_CREATION_DATE,
  lastUpdate: CMP_PR_LAST_UPDATE
};

export const pedidoFields = {
  set_pedido_id: CMP_PE_SET_PEDIDO_ID,
  price: CMP_PE_PRICE,
  client_name: CMP_PE_CLIENT_NAME,
  client_lastname: CMP_PE_CLIENT_LASTNAME,
  email: CMP_PE_EMAIL,
  phone: CMP_PE_PHONE,
  country: CMP_PE_COUNTRY,
  DepState: CMP_PE_DEPA_STATE,
  city: CMP_PE_CITY,
  postal_code: CMP_PE_POSTAL_CODE,
  meth_pay: CMP_PE_METH_PAY,
  status_col_3: CMP_PE_STATUS_COL_3,
  val_to_pay: CMP_PE_VAL_TO_PAY,
  dirrection: CMP_PE_DIRRECTION,
  date_creation: CMP_PE_DATE_CREATION,
  last_update: CMP_PE_LAST_UPDATE,
};
