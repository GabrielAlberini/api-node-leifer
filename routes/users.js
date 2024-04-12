import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", (req, res) => {
  res.json({ a: 1 });
});

export default usersRouter;
