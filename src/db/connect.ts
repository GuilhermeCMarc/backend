import { createConnection, EntitySchema } from "typeorm";
import dotenv from "dotenv";
import { Task } from "../entities/Task";
import { Base } from "../entities/Base";
import { User } from "../entities/User";

dotenv.config();

export const connection = createConnection({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Base, Task],
  synchronize: true,
});
