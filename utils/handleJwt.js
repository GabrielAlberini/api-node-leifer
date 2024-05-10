import jwt from "jsonwebtoken";
import { throwError } from "../utils/templateError.js";

const JWT_SECRET = process.env.JWT_SECRET;

const tokenSign = async (user) => {
  return jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "2h",
  });
};

const tokenValidate = async (token) => {
  if (token === null || token === undefined) {
    throwError("Token is required for access", "InvalidToken", 403);
  }

  try {
    const validator = jwt.verify(token, JWT_SECRET);
    return validator;
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      throwError("Invalid token", "InvalidToken", 403);
    }
  }
};

export { tokenSign, tokenValidate };
