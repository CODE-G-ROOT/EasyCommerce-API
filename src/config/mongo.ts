import { MongoClient, ServerApiVersion } from "mongodb";

export default class MongodbConnection {
  private static intance: MongodbConnection;
  private connection: any;

  constructor() {
    this.connection = null;
  }

  public static getIntance(): MongodbConnection {
    if (!MongodbConnection.intance) {
      MongodbConnection.intance = new MongodbConnection();
    }
    return MongodbConnection.intance;
  }

  public async connect(url: string): Promise<void> {
    try {
      if (!this.connection) {
        this.connection = new MongoClient(url, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          },
        });
        console.log("MongoDB has been conected");
      }
    } catch (error: any) {
      console.log(error.message);
      process.exit(1);
    }
  }

  public async closeConnection(): Promise<void> {
    try {
      if (this.connection) {
        await this.connection.close();
        console.log("Db has been disconected");
      }
    } catch (error: any) {
      console.log(error.message);
      process.exit(1);
    }
  }

  public getConnection(dbname: string) {
    return this.connection?.db(dbname);
  }
}
