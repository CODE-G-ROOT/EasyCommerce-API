import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";

/* ROUTES */
import products from "./routes/products.routes";
import api from "./routes/api.routes";
import pedido from "./routes/pedidos.routes";
import { setTime } from "./utils/send";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/uploads/"
}));

app.use((_req, res, next) => setTime(15, res, next)); // cambiar el número para controlar el tiempo máximo de respuesta del servidor

app.use("/api", api);
app.use("/products", products);
app.use("/pedidos", pedido);

export default app;
