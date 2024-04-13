import { TracksModel } from "../models/index.js";
import { validateTrack, validatePartialTrack } from "../validators/tracks.js";

/**
 * Obtiene una lista de items.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Function} next - Función para llamar al siguiente middleware.
 * @returns {Promise<void>}
 * @description Esta función obtiene una lista de registros de pistas de la base de datos.
 * Si la operación se realiza correctamente, se devolverá un objeto JSON que contiene la lista de pistas.
 * Si ocurre un error durante la operación, se pasará al siguiente middleware con el error.
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
 * Obtiene un detalle de un registro.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Function} next - Función para llamar al siguiente middleware.
 * @returns {Promise<void>}
 * @description Esta función obtiene el detalle de un registro de pista de la base de datos.
 * El parámetro `id` en la ruta de la solicitud debe ser el ID único del registro que se desea obtener.
 * Ejemplo de ruta de solicitud: '/tracks/6074e105ac83c317d0c2fd2a'
 * Si el registro existe, se devolverán sus datos en un objeto JSON.
 * Si el registro no existe, se devolverá un error de tipo 'NotFoundError' con un código de estado 404 (Not Found).
 * Si el ID proporcionado en la solicitud no es válido, se devolverá un error de tipo 'CastError' con un código de estado 400 (Bad Request).
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
 * Inserta un registro.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<void>}
 * @description Esta función inserta un nuevo registro en la base de datos de tracks.
 * El cuerpo de la solicitud debe contener los siguientes campos:
 * - name: El nombre de la pista (String).
 * - album: El nombre del álbum al que pertenece la pista (String).
 * - cover: La URL de la portada del álbum (String).
 * - artist: Un objeto que contiene la información del artista de la pista, con los siguientes campos:
 *   - name: El nombre completo del artista (String).
 *   - nickname: El apodo o nombre artístico del artista (String).
 *   - nationality: La nacionalidad del artista (String).
 * - duration: Un objeto que contiene el inicio y el fin de la duración de la pista en segundos, con los siguientes campos:
 *   - start: El tiempo de inicio de la pista (Number).
 *   - end: El tiempo de fin de la pista (Number).
 * - mediaId: El ID de la media asociada a la pista (String).
 * Ejemplo de solicitud:
 * {
 *    "name": "Canción de ejemplo",
 *    "album": "Álbum de ejemplo",
 *    "cover": "https://example.com/cover.jpg",
 *    "artist": {
 *      "name": "Artista de ejemplo",
 *      "nickname": "Apodo de ejemplo",
 *      "nationality": "Nacionalidad de ejemplo"
 *    },
 *    "duration": {
 *      "start": 0,
 *      "end": 180
 *    },
 *    "mediaId": "6074e105ac83c317d0c2fd2a"
 * }
 * Si la solicitud es válida, se creará el registro en la base de datos y se devolverá un objeto JSON con los datos del nuevo registro.
 * Si la solicitud es inválida, se devolverá un error de validación con un código de estado 400 (Bad Request).
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
    next(error);
  }
};

/**
 * Actualiza un registro.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Function} next - Función para llamar al siguiente middleware.
 * @returns {Promise<void>}
 * @description Esta función actualiza un registro de pista en la base de datos.
 * El parámetro `id` en la ruta de la solicitud debe ser el ID único del registro que se desea actualizar.
 * El cuerpo de la solicitud debe contener los campos que se desean actualizar en el registro.
 * Ejemplo de ruta de solicitud: '/tracks/6074e105ac83c317d0c2fd2a'
 * Ejemplo de cuerpo de solicitud:
 * {
 *    "name": "Nuevo nombre de la pista",
 *    "album": "Nuevo nombre del álbum",
 *    ...
 * }
 * Si el registro se actualiza correctamente, se devolverán sus datos actualizados en un objeto JSON.
 * Si el registro no existe, se devolverá un error de tipo 'NotFoundError' con un código de estado 404 (Not Found).
 * Si el ID proporcionado en la solicitud no es válido, se devolverá un error de tipo 'CastError' con un código de estado 400 (Bad Request).
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
 * Elimina un registro.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Function} next - Función para llamar al siguiente middleware.
 * @returns {Promise<void>}
 * @description Esta función elimina un registro de pista de la base de datos.
 * El parámetro `id` en la ruta de la solicitud debe ser el ID único del registro que se desea eliminar.
 * Ejemplo de ruta de solicitud: '/tracks/6074e105ac83c317d0c2fd2a'
 * Si el registro se elimina correctamente, se devolverán sus datos en un objeto JSON.
 * Si el registro no existe, se devolverá un error de tipo 'NotFoundError' con un código de estado 404 (Not Found).
 * Si el ID proporcionado en la solicitud no es válido, se devolverá un error de tipo 'CastError' con un código de estado 400 (Bad Request).
 */

const deleteItem = async (req, res, next) => {
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

export { getItems, getItem, createItem, updateItem, deleteItem };
