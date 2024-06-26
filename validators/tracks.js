import zod from "zod";

const { string, number, object } = zod;

// Define el esquema de un track completo
const trackSchema = object({
  name: string(),
  album: string(),
  cover: string(),
  artist: object({
    name: string(),
    nickname: string(),
    nationality: string(),
  }),
  duration: object({
    start: number(),
    end: number(),
  }),
  mediaId: string(),
});

// Define el esquema para la validación parcial de un track
const partialTrackSchema = trackSchema.deepPartial();

const validateTrack = (objTrack) => {
  const validationResult = trackSchema.safeParse(objTrack);
  return validationResult;
};

const validatePartialTrack = (objTrack) => {
  const validationResult = partialTrackSchema.safeParse(objTrack);
  return validationResult;
};

export { validateTrack, validatePartialTrack };
