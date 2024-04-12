import { Router } from "express";

const storagesRouter = Router();

storagesRouter.get("/", (req, res) => {
  res.json({ a: 1 });
});

export default storagesRouter;
