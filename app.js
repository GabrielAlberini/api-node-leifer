import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./config/mongo.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server on http://localhost:${PORT}`);
});
