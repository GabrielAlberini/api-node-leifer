import { fileURLToPath, pathToFileURL } from "url";
import { Router } from "express";
import { dirname, join } from "path";
import fs from "fs/promises";

const indexRouter = Router();

const getDirectoryPath = () => {
  const __filename = fileURLToPath(import.meta.url);
  return dirname(__filename);
};

const readDirectory = async (directoryPath) => {
  try {
    const files = await fs.readdir(directoryPath);
    return files;
  } catch (error) {
    throw error;
  }
};

const removeExtension = (file) => {
  return file.split(".")[0];
};

const importModules = async (directoryPath, router) => {
  try {
    const files = await readDirectory(directoryPath);
    for (const file of files) {
      const name = removeExtension(file);
      if (name !== "index") {
        const filePath = join(directoryPath, file);
        const fileUrl = pathToFileURL(filePath);
        const module = await import(fileUrl);
        router.use(`/${name}`, module.default);
      }
    }
  } catch (error) {
    console.error("Error al leer el directorio:", error);
  }
};

const directoryPath = getDirectoryPath();

importModules(directoryPath, indexRouter);

export { indexRouter };
