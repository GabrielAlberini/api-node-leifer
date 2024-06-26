import zod from "zod";

const userSchema = zod.object({
  name: zod.string().min(4).max(99),
  age: zod.number().int().min(12),
  email: zod.string().email(),
  password: zod.string().min(8).max(20),
  role: zod.enum(["user", "admin"]).default("user"),
});

const validateUser = (objMovie) => {
  const responseValidator = userSchema.safeParse(objMovie);
  return responseValidator;
};

const validatePartialUser = (objMovie) => {
  const responseValidator = userSchema.partial().safeParse(objMovie);
  return responseValidator;
};

export { validateUser, validatePartialUser };
