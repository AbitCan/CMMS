import express from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { notFoundHandler } from "./middlewares/notFoundHandler";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "cmms-backend",
  });
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;