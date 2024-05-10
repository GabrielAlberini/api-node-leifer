import { StoragesModel } from "../models/index.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { handleError } from "../utils/handleError.js";
import fs from "fs/promises";
import { throwError } from "../utils/templateError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_ULR = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Retrieves a list of items from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the list of items is retrieved successfully, or rejects with an error.
 */
const getItems = async (req, res) => {
  try {
    const data = await StoragesModel.find({});
    res.json({ data });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Retrieves a single item from the StoragesModel by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the item is retrieved successfully, or rejects with an error.
 * @throws {NotFoundError} - If the item with the specified ID does not exist.
 */
const getItem = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await StoragesModel.findById(id);
    if (!data) {
      throwError("Storage not found", "NotFoundError", 404);
    }
    res.json({ data });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Insert a new file into the StoragesModel.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the file is inserted successfully.
 * @throws {Error} - If there is an error inserting the file.
 */
const createItem = async (req, res) => {
  const { file } = req;
  try {
    const newFile = {
      filename: file.filename,
      url: `${PUBLIC_ULR}/${file.filename}`,
    };

    const data = await StoragesModel.create(newFile);

    res.json({ data });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Delete an item from the storage by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the item is deleted successfully.
 */
const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const file = await StoragesModel.findById(id);

    if (!file) {
      throwError("Storage not found", "NotFoundError", 404);
    }

    const filePath = join(MEDIA_PATH, file.filename);

    //The unlink function is used to remove a file from the file system.
    fs.unlink(filePath);

    await StoragesModel.delete({ _id: id });

    res.json({
      data: {
        filePath,
        delete: true,
      },
    });
  } catch (error) {
    handleError(res, error);
  }
};

export { getItems, getItem, createItem, deleteItem };
