import express, { Application, Request, Response } from "express";
import cors from "cors"; // Import the CORS middleware
import Database from "./config/database";
import TaskRouter from "./router/TaskRouter"; // Import the TaskRouter

class App {
  public app: Application;

  constructor() {
    this.app = express(); // Initialize express instance
    this.databaseSync(); // Sync the database
    this.plugins(); // Enable cors, convert to json format, url encoding
    this.routes(); // Enable routes
  }

  protected plugins(): void {
    this.app.use(cors()); // Enable CORS for all routes
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); // converts characters into a format that can be transmitted over the Internet.
  }

  protected databaseSync(): void {
    const db = new Database(); // set up database instance
    db.sequelize?.sync(); // synchronizes the database with sequelize orm
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("Welcome home");
    });
    this.app.use("/api/v01/task", TaskRouter); // Use TaskRouter for task routes
  }
}

const port: number = 4000; // Ensure this matches your backend port
const app = new App().app; // new instance of App gets app propersty from Exopress

app.listen(port, () => {
  console.log(`Server started successfully on port ${port}`);
});
