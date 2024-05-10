import { errorMessages } from "./constants.js";

const {
  NOT_FOUND_ERROR,
  MISSED_ID,
  FILE_EXTENSION_ERROR,
  VALIDATION_BODY_REQUEST_ERROR,
  MONGO_SERVER_ERROR,
  INVALID_PASSWORD,
  INVALID_TOKEN,
} = errorMessages;

export const handleError = (res, err) => {
  const { name, message, kind, issues, status } = err;
  console.log({ name: err.name, kind });

  if (name === NOT_FOUND_ERROR.name) {
    return res.status(status).json({ error: { code: status, message } });
  }

  if (name === MISSED_ID.name) {
    return res.status(status).json({ error: { code: status, message } });
  }

  if (name === VALIDATION_BODY_REQUEST_ERROR.name) {
    return res
      .status(status)
      .json({ error: { code: status, message, issues } });
  }

  if (name === FILE_EXTENSION_ERROR.name) {
    return res.status(status).json({ error: { code: status, message } });
  }

  if (name === MONGO_SERVER_ERROR.name) {
    return res.status(status).json({ error: { code: status, message } });
  }

  if (name === INVALID_PASSWORD.name) {
    return res.status(status).json({ error: { code: status, message } });
  }

  if (name === INVALID_TOKEN.name) {
    return res.status(status).json({ error: { code: status, message } });
  }

  // Otros errores internos del servidor
  res.status(500).json({ error: { code: 500, message: "Server error" } });
};
