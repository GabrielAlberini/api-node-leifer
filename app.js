import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import { dbConnect } from "./config/mongo.js";
import { indexRouter } from "./routes/index.js";
import { sessionTimeClientHandler } from "./middlewares/sessionTimeClientHandler.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("storage"));

app.use("/api", sessionTimeClientHandler(1, 10));

app.use("/api", indexRouter);

app.use("*", (req, res) => {
  res.status(404).json({ error: { code: 404, message: "Not found resourse" } });
});

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server on http://localhost:${PORT}`);
});
