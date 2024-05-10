export const EXT_FILES = ["mp3", "wav", "aiff", "aac", "flac", "ogg", "m4a"];

export const REGEX_ID_VALIDATOR = /^[0-9a-fA-F]{24}$/;

export const errorMessages = {
  NOT_FOUND_ERROR: {
    name: "NotFoundError",
  },
  MISSED_ID: {
    name: "ValidationError",
  },
  FILE_EXTENSION_ERROR: {
    name: "FileExtensionError",
  },
  VALIDATION_BODY_REQUEST_ERROR: {
    name: "ValidationBodyRequestError",
  },
  MONGO_SERVER_ERROR: {
    name: "MongoServerError",
  },
  INVALID_PASSWORD: {
    name: "InvalidPassword",
  },
  INVALID_TOKEN: {
    name: "InvalidToken",
  },
};
