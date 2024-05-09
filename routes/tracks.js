import { Router } from "express";
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/tracks.js";
import {
  validateResultsPartialTrack,
  validateResultsTrack,
} from "../utils/handleValidators.js";
import { authMiddleware } from "../middlewares/sesion.js";

const tracksRouter = Router();

tracksRouter.get("/", authMiddleware, getItems);
tracksRouter.get("/:id", getItem);
tracksRouter.post("/", validateResultsTrack, createItem);
tracksRouter.patch("/:id", validateResultsPartialTrack, updateItem);
tracksRouter.delete("/:id", deleteItem);

export default tracksRouter;
