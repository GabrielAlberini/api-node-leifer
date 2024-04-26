import { Router } from "express";
import { uploadMiddleware } from "../utils/handleStorage.js";
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/storages.js";

const storagesRouter = Router();

storagesRouter.get("/", getItems);
storagesRouter.get("/:id", getItem);
storagesRouter.post("/", uploadMiddleware.single("file"), createItem);
storagesRouter.patch("/:id", updateItem);
storagesRouter.delete("/:id", deleteItem);

export default storagesRouter;
