import { Sequelize } from "sequelize-typescript"; // Import Sequelize
import * as dotenv from "dotenv"; // Import dotenv for environment variables
import { Task } from "../model/Task"; // Import the Note model
dotenv.config(); // Load environment variables

class Database {
  public sequelize: Sequelize | undefined;

  private POSTGRES_DB = process.env.POSTGRES_DB as string;
  private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
  private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
  private POSTGRES_USER = process.env.POSTGRES_USER as unknown as string;
  private POSTGRES_PASSWORD = process.env
    .POSTGRES_PASSWORD as unknown as string;

  constructor() {
    this.connectToPostgreSQL(); // Connect to the PostgreSQL database
  }

  private async connectToPostgreSQL() {
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      host: this.POSTGRES_HOST,
      port: this.POSTGRES_PORT,
      dialect: "postgres", // Specify the database dialect
      models: [Task], // Register the Note model
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log(
          "✅ PostgreSQL Connection has been established successfully." //log success
        );
      })
      .catch((err) => {
        console.error("❌ Unable to connect to the PostgreSQL database:", err); // log error
      });
  }
}

export default Database; // Export the Database class
