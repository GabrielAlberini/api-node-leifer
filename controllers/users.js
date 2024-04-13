import { UsersModel } from "../models/index.js";
import { validateUser, validatePartialUser } from "../validators/users.js";

/**
 * Obtener lista de items
 * @param {*} req
 * @param {*} res
 */
const getItems = (req, res) => {};

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

    const validate = validateUser(body);

    if (!validate.success) {
      return res.status(400).json({ error: validate.error.issues });
    }

    const existingUser = await UsersModel.findOne({ email: body.email });

    if (existingUser) {
      return res.status(400).json({ error: "Existing user" });
    }

    const newUser = await UsersModel.create(body);
    res.status(201).json({ data: newUser });
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
const deleteItem = (req, res) => {};

export { getItems, getItem, createItem, updateItem, deleteItem };
