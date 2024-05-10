import { UsersModel } from "../models/index.js";
import { handleError } from "../utils/handleError.js";
import { validateUser, validatePartialUser } from "../validators/users.js";
import { throwError } from "../utils/templateError.js";

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
      throwError(
        "Error to body data request",
        "ValidationBodyRequestError",
        400,
        issues
      );
    }

    const newUser = await UsersModel.create(body);
    res.status(201).json({ data: newUser });
  } catch (error) {
    handleError(res, error);
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
