# Create Simple CRUD server with Node JS, TypeScript and PostgreSQL

Create a Directory and changing working Into It with `mkdir crud  && cd crud` command. Then Initializing a Yarn Project with`yarn init`. We can view package.jspn created by previous bash command with `cat package.json`. Then we need add development dependencies (-D flag is for development dependencies) `yarn add -D typescript ts-node @types/node @types/express nodemon`.
`npx tsx --init` This command initializes a TypeScript configuration file (tsconfig.json).
`code tsconfig.json` Lastly we need to open tsconfig.json to configure the configurations as below code snippet.

```json
"outDir": "./build" // uncomment and build in buld folder
"experimentalDecorators": true // uncomment
"emitDecoratorMetadata": true  // uncomment
```

- "outDir": "./build":
  This setting specifies the output directory for compiled JavaScript files. By uncommenting it, TypeScript will place the compiled files in a build folder.
- "experimentalDecorators": true:
  This enables support for experimental decorator syntax in TypeScript, allowing you to use decorators in your classes.
- "emitDecoratorMetadata": true:
  This option adds metadata to the emitted JavaScript files for decorators, which can be useful when using frameworks that rely on metadata (like Angular).

We need to add below code snippet into package.json for building and developing the project.

```json
"scripts": {
    "build": "tsc",
    "dev": "nodemon ./build/index.js",
    "start-dev": "tsc && yarn dev"
  },
```

## Building simple server

Create index.ts file under src folder, type `console.log("hello world!");` in the file then build the project `yarn build` then `yarn dev`

Express is a node js web application framework that provides broad features for building web and mobile applications. It is used to build a single page, multipage, and hybrid web application. It's a layer built on the top of the Node js that helps manage servers and routes. Now we need to add express dependencies.
`yarn add express`
`yarn add -D @types/express`

We can build our simple server in index.ts now.

```typescript
import express, { Application, Request, Response } from "express";
/*This line imports the express framework and specific types (Application, Request, Response) from the express package. This allows you to create an Express application and handle HTTP requests and responses with type safety.*/

class App {
  public app: Application; //A class named App is defined, which encapsulates the Express application. It has a public property app of type Application.

  constructor() {
    this.app = express(); //initializes the app property with an instance of the Express application.
    this.routes(); //it calls the routes method to set up the application's routes.
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("welcome home");
    });
  }
  /*This method is responsible for defining the application's routes.
  It sets up a route for the root URL ("/"). When a GET request is made to this endpoint, it responds with the text "welcome home".
  */
}

const port: number = 8080; //A constant port is defined, on which the server will listen port 8080.
const app = new App().app; //An instance of the App class is created, and the app property (the Express application) is extracted.

app.listen(port, () => {
  console.log(`server started successfully on port ${port}`);
}); // the listen method starts the server on the specified port. A callback function logs a message indicating that the server has started successfully.
```

After running `yarn build` then `yarn dev`,this code sets up a simple Express server that listens on port 8080 and responds with "welcome home" when a GET request is made to the root URL (/). It uses a class to encapsulate the application logic, making it modular and easier to manage.

## Create Configuration for connecting to database

We will define a Database class that establishes a connection to a PostgreSQL database using the sequelize-typescript library. It also uses environment variables to configure the connection settings. First we will add dependencies then creat a database file under config folder for configuration.

`yarn add pg sequelize sequelize-typescript reflect-metadata dotenv`
`mkdir config && touch config/database.ts`

```typescript
import { Sequelize } from "sequelize-typescript"; // it is for interacting with the database.
import * as dotenv from "dotenv"; // A module to load environment variables from a .env file into process.env.
dotenv.config(); //Loads environment variables from a .env file.

class Database {
  public sequelize: Sequelize | undefined; // The main class responsible for handling the database connection.
  //An instance of Sequelize, initialized later. It’s marked as possibly undefined initially.

  private POSTGRES_DB = process.env.POSTGRES_DB as string;
  private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
  private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
  private POSTGRES_USER = process.env.POSTGRES_USER as unknown as string;
  private POSTGRES_PASSWORD = process.env
    .POSTGRES_PASSWORD as unknown as string;
  // These variables fetch database connection details from environment variables, ensuring the application doesn't hard-code sensitive information.

  constructor() {
    this.connectToPostgreSQL(); // to establish a connection to the PostgreSQL database when an instance of the Database class is created.
  }

  private async connectToPostgreSQL() {
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      host: this.POSTGRES_HOST,
      port: this.POSTGRES_PORT,
      dialect: "postgres",
    }); // initializes the Sequelize instance with the configuration options gathered from environment variables.

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log(
          "✅ PostgreSQL Connection has been established successfully."
        );
      })
      .catch((err) => {
        console.error("❌ Unable to connect to the PostgreSQL database:", err);
      }); //The authenticate method checks if the connection to the database can be established.
    // If successful, it logs a success message; if it fails, it logs an error message.
  }
}

export default Database;
```

Lastly we need create database connection in index.ts constructor

```ts
  constructor() {
    this.databaseSync();
  }

  protected databaseSync(): void {
    const db = new Database();
    db.sequelize?.sync();
  }
```

## Creating PostgreSQL Database

We first need to install postgres with brew if we don't have it in our system. Then access to postgres interface to create a user and database.

```console
brew install postgresql
brew services start postgresql // to start service
//brew services stop postgresql
brew services list // to see all the running services
psql postgres // To access the PostgreSQL command line interface
```

We need to create a new user with password which are alredy defined in the .env file.

```sql
CREATE USER username WITH PASSWORD 'password';
```

then create a new database, all the names must be lowercase.

```sql
CREATE DATABASE taskdb;
```

then we can quit from sql interface with `\q` and we can start server with `yarn start-dev` to see database connection is set up.

## Creating a Model with Sequilize ORM

Sequelize is an ORM (Object-Relational Mapping) library that helps manage database interactions.

```ts
import { Model, Table, Column, DataType } from "sequelize-typescript";
```

Here, you're importing necessary classes from the sequelize-typescript package:

**Model:** Base class for all models.
**Table:** Decorator to define a database table.
**Column:** Decorator to define a column in the table.
**DataType:** Used to specify the type of data that each column will hold.

#### - Table Decorator:

```ts
@Table({
  tableName: Note.NOTE_TABLE_NAME,
})
```

This decorator marks the class as a Sequelize model, and it specifies the name of the table in the database, which is defined as Note.NOTE_TABLE_NAME.

```ts
export class Note extends Model {
```

This line defines a class Note that extends Model. This means Note will inherit methods and properties that allow it to interact with the database.

#### - Static Properties:

```ts
public static NOTE_TABLE_NAME = "note" as string;
public static NOTE_ID = "id" as string;
public static NOTE_NAME = "name" as string;
public static NOTE_DESCRIPTION = "description" as string;
```

These static properties define constants that are used to refer to the table name and column names. This can help avoid hardcoding strings throughout your code.

#### - Columns:

Each @Column decorator defines a column in the database:

**type:** DataType.INTEGER: Specifies that the column type is an integer.
**primaryKey:** true: Indicates that this column is the primary key.
**autoIncrement:** true: Automatically increments the ID when a new note is created.
**field:** Note.NOTE_ID: Maps this property to the "id" field in the database.

```ts
@Column({
 type: DataType.INTEGER,
 primaryKey: true,
 autoIncrement: true,
 field: Note.NOTE_ID,
})
id!: number;

@Column({
  type: DataType.STRING(100),
  field: Note.NOTE_NAME,
})
name!: string;

@Column({
  type: DataType.STRING(255),
  field: Note.NOTE_DESCRIPTION,
})
```

#### - Summary

This model represents a "Note" entity with three fields: id, name, and description. The class includes metadata to define how these fields map to a database table called "note." This setup allows you to perform CRUD (Create, Read, Update, Delete) operations on the notes in your database using Sequelize.

Lastly we need to use model in database connection file, then we can restart the project

```ts
private async connectToPostgreSQL() {
    this.sequelize = new Sequelize({
    ...
    models:[Note]
    });
```

http://localhost:4000/api/v1/note' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

yarn add cors
yarn add -D @types/cors
import cors from "cors"; // Import the CORS middleware
this.app.use(cors()); // Enable CORS for all routes
