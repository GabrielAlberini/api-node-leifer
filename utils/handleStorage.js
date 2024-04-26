import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import crypto from "node:crypto";
import { EXT_FILES } from "../utils/constant.js";

// Obtiene el directorio actual del módulo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathStorage = join(__dirname, "../storage");
    cb(null, pathStorage);
  },
  filename: (req, file, cb) => {
    const id = crypto.randomUUID();

    const ext = file.originalname.split(".").pop();

    if (EXT_FILES.includes(ext)) {
      const filename = `file-${id}.${ext}`;
      cb(null, filename);
    } else {
      const error = new Error();
      error.name = "FileExtensionError";
      error.statusCode = 400;
      cb(error);
    }
  },
});

const uploadMiddleware = multer({
  storage,
});

export { uploadMiddleware };
