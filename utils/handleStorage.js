import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import crypto from "node:crypto";
import { EXT_FILES } from "../utils/constants.js";
import { handleError } from "../utils/handleError.js";
import { throwError } from "../utils/templateError.js";

// Obtiene el directorio actual del módulo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathStorage = join(__dirname, "../storage");
    cb(null, pathStorage);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    const isValidExtension = EXT_FILES.includes(ext);

    if (!isValidExtension) {
      try {
        throwError("Invalid file extension", "FileExtensionError", 400);
      } catch (error) {
        cb(error);
      }
    } else {
      const id = crypto.randomUUID();
      const filename = `file-${id}.${ext}`;
      cb(null, filename);
    }
  },
});

// Configurar multer con el almacenamiento definido
const uploadFile = multer({ storage });

const uploadMiddleware = (req, res, next) => {
  uploadFile.single("file")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return next(err);
    } else if (err) {
      return handleError(res, err);
    }
    next();
  });
};

export { uploadMiddleware };
