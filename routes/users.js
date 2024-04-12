import { Router } from "express";
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deletetItem,
} from "../controllers/users.js";

const usersRouter = Router();

usersRouter.get("/", getItems);
usersRouter.get("/:id", getItem);
usersRouter.post("/", createItem);
usersRouter.patch("/:id", updateItem);
usersRouter.delete("/:id", deletetItem);

export default usersRouter;
