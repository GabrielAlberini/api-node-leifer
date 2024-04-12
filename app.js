import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import { dbConnect } from "./config/mongo.js";
import { indexRouter } from "./routes/index.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/", (req, res) => {
  res.json({
    state: 200,
  });
});
app.use("/api/", indexRouter);

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server on http://localhost:${PORT}`);
});
