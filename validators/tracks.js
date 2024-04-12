import zod from "zod";

const artistSchema = zod.object({
  name: zod.string(),
  nickname: zod.string(),
  nationality: zod.string(),
});

const durationSchema = zod.object({
  start: zod.number().int(),
  end: zod.number().int(),
});

const trackSchema = zod.object({
  name: zod.string(),
  album: zod.string(),
  cover: zod.string(), // Aquí puedes agregar validación adicional si es necesario
  artist: artistSchema,
  duration: durationSchema,
  mediaId: zod.string(),
});

const validateTrack = (objTrack) => {
  const validationResult = trackSchema.safeParse(objTrack);
  return validationResult;
};

const validatePartialTrack = (objTrack) => {
  const validationResult = trackSchema.partial().safeParse(objTrack);
  return validationResult;
};

export { validateTrack, validatePartialTrack };
