import { errorMessages } from "../utils/constants.js";
const {
  NOT_FOUND_ERROR,
  CAST_ERROR,
  FILE_EXTENSION_ERROR,
  VALIDATION_BODY_REQUEST_ERROR,
  MONGO_SERVER_ERROR,
  INVALID_TOKEN,
} = errorMessages;

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const { name, kind, issues } = err;

  if (name === NOT_FOUND_ERROR.name) {
    return res.status(400).json({ error: NOT_FOUND_ERROR.message });
  }

  if (name === VALIDATION_BODY_REQUEST_ERROR.name) {
    return res.status(400).json({ error: issues });
  }

  if (name === CAST_ERROR.name && kind === CAST_ERROR.kind) {
    return res.status(400).json({ error: CAST_ERROR.message });
  }

  if (name === FILE_EXTENSION_ERROR.name) {
    return res.status(400).json({ error: FILE_EXTENSION_ERROR.message });
  }

  if (name === MONGO_SERVER_ERROR.name) {
    return res.status(400).json({ error: MONGO_SERVER_ERROR.message });
  }

  if (name === INVALID_TOKEN.name) {
    return res.status(403).json({ error: INVALID_TOKEN.message });
  }

  // Otros errores internos del servidor
  res.status(500).json({ error: "Internal server error" });
};
