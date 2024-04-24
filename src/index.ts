import app from "./app";
import dotenv from "dotenv";
import { host, port } from "./config/config";

dotenv.config();

console.log({ host, port });

app.listen(port, host, () => {
  console.clear();
  console.log(`http://${host}:${port}/api`);
});
