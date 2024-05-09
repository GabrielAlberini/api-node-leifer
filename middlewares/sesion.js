import { tokenValidate } from "../utils/handleJwt.js";
import { UsersModel } from "../models/index.js";

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    const error = new Error();
    error.name = "InvalidToken";
    throw error;
  }

  try {
    const token = header.split(" ")[1];
    const dataToken = await tokenValidate(token);

    if (!dataToken._id) {
      const error = new Error();
      error.name = "InvalidToken";
      throw error;
    }

    const user = await UsersModel.findById(dataToken._id);

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export { authMiddleware };
