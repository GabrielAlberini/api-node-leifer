import { tokenValidate } from "../utils/handleJwt.js";
import { UsersModel } from "../models/index.js";
import { handleError } from "../utils/handleError.js";
import { throwError } from "../utils/templateError.js";

const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      throwError("Token is required for access", "InvalidToken", 403);
    }
    const token = header.split(" ")[1];
    const dataToken = await tokenValidate(token);

    if (!dataToken._id) {
      throwError("Invalid Token", "InvalidToken", 403);
    }

    const user = await UsersModel.findById(dataToken._id);

    req.user = user;

    next();
  } catch (error) {
    handleError(res, error);
  }
};

export { authMiddleware };
