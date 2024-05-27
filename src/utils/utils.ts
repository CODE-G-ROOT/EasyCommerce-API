import dotenv from "dotenv";

dotenv.config();

const { SERVER_CONFIG, CON_STRING, DB, CAMPOS_DB, CLOUDINARY } = process.env!;
const server = JSON.parse(SERVER_CONFIG!);

export { CON_STRING, DB };
export const { CLOUDNAME, API_KEY, API_SECRET } = JSON.parse(CLOUDINARY!);
export const pedidos_collection = JSON.parse(CAMPOS_DB!);
export const { host, port } = server;
