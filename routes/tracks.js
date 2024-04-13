import { Router } from "express";
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/tracks.js";

const tracksRouter = Router();

tracksRouter.get("/", getItems);
tracksRouter.get("/:id", getItem);
tracksRouter.post("/", createItem);
tracksRouter.patch("/:id", updateItem);
tracksRouter.delete("/:id", deleteItem);

export default tracksRouter;
