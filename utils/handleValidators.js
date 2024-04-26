import { validateTrack, validatePartialTrack } from "../validators/tracks.js";

const validateResults = (validator) => (req, res, next) => {
  try {
    const { body } = req;
    const validate = validator(body);
    if (!validate.success) {
      const error = new Error();
      error.name = "ValidationBodyRequestError";
      error.issues = validate.error.issues;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateResultsTrack = validateResults(validateTrack);
const validateResultsPartialTrack = validateResults(validatePartialTrack);

export { validateResultsTrack, validateResultsPartialTrack };
