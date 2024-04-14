import { TracksModel } from "../models/index.js";
import { validateTrack, validatePartialTrack } from "../validators/tracks.js";
/**
 * Get a list of items.
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - Function to call the next middleware.
 * @returns {Promise<void>}
 * @description This function retrieves a list of track records from the database.
 * If the operation is successful, it will return a JSON object containing the list of tracks.
 * If an error occurs during the operation, it will pass to the next middleware with the error.
 * The 'page' parameter in the HTTP request query is used to specify the page of results.
 * If the 'page' parameter is not provided, it is assumed to be 1 by default.
 * The function uses the TracksModel data model to search for records in the MongoDB database.
 * Records are retrieved in batches of default size (5 tracks per page) using search options,
 * such as 'skip' and 'limit', calculated from the 'page' parameter.
 */
const getItems = async (req, res, next) => {
  try {
    let { page } = req.query;

    page = parseInt(page) || 1;
    const limit = 5;

    // Construir objeto de opciones de búsqueda para MongoDB
    const options = {
      skip: (page - 1) * limit,
      limit,
    };

    const data = await TracksModel.find({}, null, options);

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

/**
 * Get details of a record.
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - Function to call the next middleware.
 * @returns {Promise<void>}
 * @description This function retrieves the details of a track record from the database.
 * The `id` parameter in the request route should be the unique ID of the record to be retrieved.
 * Example request route: '/tracks/6074e105ac83c317d0c2fd2a'
 * If the record exists, its data will be returned in a JSON object.
 * If the record does not exist, a 'NotFoundError' error will be returned with a status code of 404 (Not Found).
 * If the ID provided in the request is not valid, a 'CastError' error will be returned with a status code of 400 (Bad Request).
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
 * Insert a record.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise<void>}
 * @description This function inserts a new record into the tracks database.
 * The request body must contain the following fields:
 * - name: The name of the track (String).
 * - album: The name of the album to which the track belongs (String).
 * - cover: The URL of the album cover (String).
 * - artist: An object containing information about the track artist, with the following fields:
 *   - name: The full name of the artist (String).
 *   - nickname: The artist's nickname or stage name (String).
 *   - nationality: The nationality of the artist (String).
 * - duration: An object containing the start and end of the track duration in seconds, with the following fields:
 *   - start: The start time of the track (Number).
 *   - end: The end time of the track (Number).
 * - mediaId: The ID of the media associated with the track (String).
 * Example request:
 * {
 *    "name": "Sample Song",
 *    "album": "Sample Album",
 *    "cover": "https://example.com/cover.jpg",
 *    "artist": {
 *      "name": "Example Artist",
 *      "nickname": "Example Nickname",
 *      "nationality": "Example Nationality"
 *    },
 *    "duration": {
 *      "start": 0,
 *      "end": 180
 *    },
 *    "mediaId": "6074e105ac83c317d0c2fd2a"
 * }
 * If the request is valid, the record will be created in the database and a JSON object with the data of the new record will be returned.
 * If the request is invalid, a validation error will be returned with a status code of 400 (Bad Request).
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
 * Update a record.
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - Function to call the next middleware.
 * @returns {Promise<void>}
 * @description This function updates a track record in the database.
 * The `id` parameter in the request route should be the unique ID of the record to be updated.
 * The request body should contain the fields to be updated in the record.
 * Example request route: '/tracks/6074e105ac83c317d0c2fd2a'
 * Example request body:
 * {
 *    "name": "New track name",
 *    "album": "New album name",
 *    ...
 * }
 * If the record is successfully updated, its updated data will be returned in a JSON object.
 * If the record does not exist, a 'NotFoundError' error will be returned with a status code of 404 (Not Found).
 * If the ID provided in the request is not valid, a 'CastError' error will be returned with a status code of 400 (Bad Request).
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
 * Delete a record.
 * @param {Object} req - The HTTP request.
 * @param {Object} res - The HTTP response.
 * @param {Function} next - Function to call the next middleware.
 * @returns {Promise<void>}
 * @description This function deletes a track record from the database.
 * The `id` parameter in the request route should be the unique ID of the record to be deleted.
 * Example request route: '/tracks/6074e105ac83c317d0c2fd2a'
 * If the record is deleted successfully, its data will be returned in a JSON object.
 * If the record does not exist, a 'NotFoundError' error will be returned with a status code of 404 (Not Found).
 * If the ID provided in the request is not valid, a 'CastError' error will be returned with a status code of 400 (Bad Request).
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
