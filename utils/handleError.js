import { errorMessages } from "./constants.js";

const {
  NOT_FOUND_ERROR,
  MISSED_ID,
  CAST_ERROR,
  FILE_EXTENSION_ERROR,
  VALIDATION_BODY_REQUEST_ERROR,
  MONGO_SERVER_ERROR,
  INVALID_TOKEN,
} = errorMessages;

export const handleError = (res, err) => {
  const { name, kind, issues } = err;

  if (name === NOT_FOUND_ERROR.name) {
    return res.status(400).json({ error: name });
  }

  if (name === MISSED_ID.name) {
    return res.status(400).json({ error: name });
  }

  if (name === VALIDATION_BODY_REQUEST_ERROR.name) {
    return res.status(400).json({ error: issues });
  }

  if (name === CAST_ERROR.name && kind === CAST_ERROR.kind) {
    return res.status(400).json({ error: kind });
  }

  if (name === FILE_EXTENSION_ERROR.name) {
    return res.status(400).json({ error: name });
  }

  if (name === MONGO_SERVER_ERROR.name) {
    return res.status(400).json({ error: name });
  }

  if (name === INVALID_TOKEN.name) {
    return res.status(403).json({ error: name });
  }

  // Otros errores internos del servidor
  res.status(500).json({ error: "ServerError" });
};
