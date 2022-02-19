import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const routes = express.Router();

routes.get("/", (req, res) => res.send("Hello"));

app.use(routes);

app.listen(3333, () =>
  console.log("Server running on http://localhost:3333" + process.env.TEST)
);
