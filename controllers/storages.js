import { StoragesModel } from "../models/index.js";
const PUBLIC_ULR = process.env.PUBLIC_URL;

/**
 * Obtener lista de items
 * @param {*} req
 * @param {*} res
 */
const getItems = (req, res) => {
  res.json({ a: 1 });
};

/**
 * Obtener un detalle de un registro
 * @param {*} req
 * @param {*} res
 */
const getItem = (req, res) => {};

/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res, next) => {
  try {
    const { file } = req;

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
 * Actualizar un registro
 * @param {*} req
 * @param {*} res
 */
const updateItem = (req, res) => {};

/**
 * Borrar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem = (req, res) => {};

export { getItems, getItem, createItem, updateItem, deleteItem };
