import zod from "zod";

const storageSchema = zod.object({
  url: zod.string(),
  filname: zod.number(),
});

const validateStorage = (objMovie) => {
  const responseValidator = storageSchema.safeParse(objMovie);
  return responseValidator;
};

const validatePartialStorage = (objMovie) => {
  const responseValidator = storageSchema.partial().safeParse(objMovie);
  return responseValidator;
};

export { validateStorage, validatePartialStorage };
