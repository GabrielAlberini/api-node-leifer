import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const tokenSign = async (user) => {
  return jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "2h",
  });
};

const tokenValidate = async (token) => {
  if (token === null || token === undefined) {
    const error = new Error();
    error.message = "InvalidToken";
    throw error;
  }

  try {
    const validator = jwt.verify(token, JWT_SECRET);
    return validator;
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      const error = new Error();
      error.name = "InvalidToken";
      throw error;
    }
  }
};

export { tokenSign, tokenValidate };
