## Task Manager

This is a full stack project

### server

- Node.js
- Express.js
- TypeScript
- Sequelize ORM
- PostgreSQL

### client

- React
- TypeScript
- TailwindCSS

### Setting up the project

First run the following command to create .env file

```bash
cd server
cp .env.local .env
```

PostgreSQL is running on docker so we need to start docker container first

```bash
docker compose up -d
```

To stop the container `docker compose down`, to rebuild it `docker compose up --build`, then we can start node.js server with

```bash
yarn
yarn start-dev
```

this also will compile typescript code to javascript, next time we can start server with `yarn dev`. We can know test our json api with `curl http://localhost:4000` or `curl http://localhost:4000/api/v01/task`.

Lstly we can start our client side app

```bash
cd frontend
npm install
npm run build
```

After we build our app, we can use `npm run dev`
