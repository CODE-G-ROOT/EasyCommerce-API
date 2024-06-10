import MongodbConnection from "./mongo.services";
import { DB, CON_STRING } from "../utils/utils";

class DBConnection {
  private static instance: MongodbConnection;

  private constructor() {}

  public static getInstace(): MongodbConnection {
    if (!this.instance) {
      this.instance = MongodbConnection.getIntance();
      this.instance.connect(CON_STRING as string);
    }

    return this.instance;
  }

  public static validateConnection(): void {
    this.getInstace().ensureConnection(DB!);
  }

  public static getConnection() {
    return this.getInstace().getConnection(DB!);
  }
}

export default DBConnection;
