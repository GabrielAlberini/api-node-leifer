import { Router } from "express";

const tracksRouter = Router();

tracksRouter.get("/", (req, res) => {
  res.json({ a: 1 });
});

export default tracksRouter;
