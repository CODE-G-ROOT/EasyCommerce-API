import { MongoClient, ServerApiVersion } from "mongodb";

export default class MongodbConnection {
  private static intance: MongodbConnection;
  private connection: any;
  private idleTimeout: number;
  private monitoringTimer: NodeJS.Timeout | null;

  constructor() {
    this.connection = null;
    this.idleTimeout = 60 * 1000 * 60; // Tiempo de espera en milisegundos (1 Hora)
    this.monitoringTimer = null;
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
        this.startMonitoring();
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
        this.stopMonitoring();
        console.log("Db has been disconected");
      }
    } catch (error: any) {
      console.log(error.message);
      process.exit(1);
    }
  }

  private async startMonitoring(): Promise<void> {
    try {
      this.monitoringTimer = setTimeout(async () => {
        console.log({
          Server_message: "No request received in the specified time interval",
          DB_action: "Desconecting the database...",
        });
        await this.closeConnection();
      }, this.idleTimeout);
    } catch (error: any) {
      console.log("Error al iniciar el monitoreo:", error.message);
    }
  }

  private stopMonitoring(): void {
    if (this.monitoringTimer) {
      clearInterval(this.monitoringTimer);
      console.log("Monitoreo detenido");
    }
  }

  public getConnection(dbname: string) {
    return this.connection?.db(dbname);
  }
}
