import { TracksModel } from "../models/index.js";
import { validateTrack, validatePartialTrack } from "../validators/tracks.js";

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
  try {
    const { body } = req;

    const validate = validateTrack(body);

    if (!validate.success) {
      return res.status(400).json({ error: validate.error.issues });
    }

    const newTrack = await TracksModel.create(body);
    res.status(201).json({ data: newTrack });
  } catch (error) {
    console.error("Error in createItem:", error);
    res.status(500).json({ error: "Internal server error" });
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
const deletetItem = (req, res) => {};

export { getItems, getItem, createItem, updateItem, deletetItem };
