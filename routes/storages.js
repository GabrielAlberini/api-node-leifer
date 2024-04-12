import { Router } from "express";
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deletetItem,
} from "../controllers/storages.js";

const storagesRouter = Router();

storagesRouter.get("/", getItems);
storagesRouter.get("/:id", getItem);
storagesRouter.post("/", createItem);
storagesRouter.patch("/:id", updateItem);
storagesRouter.delete("/:id", deletetItem);

export default storagesRouter;
