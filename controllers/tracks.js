import { TracksModel } from "../models/index.js";

/**
 * Obtener lista de items
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  const data = await TracksModel.find({});
  res.json({ data });
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
const createItem = async (req, res) => {
  const { body } = req;
  const data = await TracksModel.create(body);
  res.status(201).json({ data });
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
const deletetItem = (req, res) => {};

export { getItems, getItem, createItem, updateItem, deletetItem };
