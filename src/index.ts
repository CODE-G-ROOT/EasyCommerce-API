import app from "./app";
import dotenv from "dotenv";
import { host, port } from "./utils/utils";

dotenv.config();

console.log({ host, port });

app.listen(port, host, () => {
  console.clear();
  console.log(`http://${host}:${port}/api`);
});
