import app from "./app";
import { env } from "./config/env";

app.listen(env.PORT, () => {
  console.log(`CMMS backend is running on port ${env.PORT}`);
});