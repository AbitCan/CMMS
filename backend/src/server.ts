import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "cmms-backend",
  });
});

app.listen(PORT, () => {
  console.log(`CMMS backend is running on port ${PORT}`);
});