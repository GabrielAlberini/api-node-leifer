export const EXT_FILES = ["mp3", "wav", "aiff", "aac", "flac", "ogg", "m4a"];

export const errorMessages = {
  NOT_FOUND_ERROR: {
    name: "NotFoundError",
    message: "El item no fue encontrado.",
  },
  CAST_ERROR: {
    name: "CastError",
    kind: "ObjectId",
    message: "ID inválido",
  },
  FILE_EXTENSION_ERROR: {
    name: "FileExtensionError",
    message: "File extension not allowed",
  },
  VALIDATION_BODY_REQUEST_ERROR: {
    name: "ValidationBodyRequestError",
  },
  MONGO_SERVER_ERROR: {
    name: "MongoServerError",
    message: "Duplicate key error collection",
  },
  INVALID_TOKEN: {
    name: "InvalidToken",
    message: "Invalid token",
  },
};
