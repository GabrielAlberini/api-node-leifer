import { StoragesModel } from "../models/index.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_ULR = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Retrieves a list of items from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise<void>} - A promise that resolves when the list of items is retrieved successfully, or rejects with an error.
 */
const getItems = async (req, res, next) => {
  try {
    const data = await StoragesModel.find({});
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a single item from the StoragesModel by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise<void>} - A promise that resolves when the item is retrieved successfully, or rejects with an error.
 * @throws {NotFoundError} - If the item with the specified ID does not exist.
 */
const getItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await StoragesModel.findById(id);
    if (!data) {
      const error = new Error();
      error.name = "NotFoundError";
      throw error;
    }
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

/**
 * Insert a new file into the StoragesModel.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise<void>} - A promise that resolves when the file is inserted successfully.
 * @throws {Error} - If there is an error inserting the file.
 */
const createItem = async (req, res, next) => {
  const { file } = req;
  try {
    const newFile = {
      filename: file.filename,
      url: `${PUBLIC_ULR}/${file.filename}`,
    };

    const data = await StoragesModel.create(newFile);

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

/**
 * Borrar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    const file = await StoragesModel.findById(id);

    if (!file) {
      const error = new Error();
      error.name = "NotFoundError";
      throw error;
    }

    const filePath = join(MEDIA_PATH, file.filename);

    //The unlink function is used to remove a file from the file system.
    fs.unlink(filePath);

    await StoragesModel.delete({ _id: id });

    res.json({
      data: {
        filePath,
        delete: 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { getItems, getItem, createItem, deleteItem };
