import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { notFoundHandler } from "./middlewares/notFoundHandler";
import { requestLogger } from "./middlewares/requestLogger";
import { registerRoutes } from "./routes";

const app = express();

app.set("trust proxy", env.TRUST_PROXY);

app.use(requestLogger);
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN === "*" ? "*" : env.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
  }),
);
app.use(express.json({ limit: env.JSON_BODY_LIMIT }));

registerRoutes(app);

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
