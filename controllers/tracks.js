import { TracksModel } from "../models/index.js";
import { validateTrack, validatePartialTrack } from "../validators/tracks.js";

/**
 * Obtener lista de items
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res, next) => {
  try {
    const data = await TracksModel.find({});
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener un detalle de un registro
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const item = await TracksModel.findById(id).exec();
    if (!item) {
      const error = new Error();
      error.name = "NotFoundError";
      throw error;
    }
    res.json({ data: item });
  } catch (error) {
    next(error);
  }
};

/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res, next) => {
  try {
    const { body } = req;

    const validate = validateTrack(body);

    if (!validate.success)
      return res.status(400).json({ error: validate.error.issues });

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
const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const validate = validatePartialTrack(body);
  if (!validate.success)
    return res.status(400).json({ error: validate.error.issues });

  try {
    const updatedItem = await TracksModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedItem) {
      const error = new Error();
      error.name = "NotFoundError";
      throw error;
    }
    res.json({ data: updatedItem });
  } catch (error) {
    next(error);
  }
};

/**
 * Borrar un registro
 * @param {*} req
 * @param {*} res
 */
const deletetItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedItem = await TracksModel.findByIdAndDelete(id);
    if (!deletedItem) {
      const error = new Error();
      error.name = "NotFoundError";
      throw error;
    }
    res.json({ data: deletedItem });
  } catch (error) {
    next(error);
  }
};

export { getItems, getItem, createItem, updateItem, deletetItem };
