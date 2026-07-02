import express from "express";
import cors from "cors";

import env from "./config/env.js";

import testRoutes from "./routes/test.routes.js";
import authRoutes from "./routes/auth.routes.js";

import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/test", testRoutes);

app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Manager API is running",
  });
});

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;