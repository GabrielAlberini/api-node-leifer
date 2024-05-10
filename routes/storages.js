import { Router } from "express";
import { uploadMiddleware } from "../utils/handleStorage.js";
import {
  getItems,
  getItem,
  createItem,
  deleteItem,
} from "../controllers/storages.js";

const storagesRouter = Router();

storagesRouter.get("/", getItems);
storagesRouter.get("/:id", getItem);
storagesRouter.post("/", uploadMiddleware, createItem);
storagesRouter.delete("/:id", deleteItem);

export default storagesRouter;
