import express from "express";
import dotenv from "dotenv";
import { connection } from "./db/connect";
import { errorHandler } from "./middlewares/error-handler";
import cors from "cors";

dotenv.config();
import { userRouter } from "./routes/user.routes";
import { authRouter } from "./routes/auth.routes";
import { taskRouter } from "./routes/task.routes";

const startServer = async () => {
  const app = express();

  await connection.then(() => console.log("📦 Db started successfully!"));

  app.use(express.json());
  app.use(cors());

  app.use("/users", userRouter);
  app.use("/auth", authRouter);
  app.use("/tasks", taskRouter);

  app.use(errorHandler);

  app.listen(3333, () =>
    console.log(
      "🔥 Server running on http://localhost:" + process.env.SERVER_PORT
    )
  );
};

startServer();
