import { errorMessages } from "../utils/constant.js";
const { NOT_FOUND_ERROR, CAST_ERROR } = errorMessages;

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const { name, kind } = err;

  if (name === NOT_FOUND_ERROR.name) {
    return res.status(400).json({ error: NOT_FOUND_ERROR.message });
  }

  if (name === CAST_ERROR.name && kind === CAST_ERROR.kind) {
    return res.status(400).json({ error: CAST_ERROR.message });
  }

  // Otros errores internos del servidor
  res.status(500).json({ error: "Internal server error" });
};
