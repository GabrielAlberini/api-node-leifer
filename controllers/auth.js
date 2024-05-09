import { UsersModel } from "../models/index.js";
import { encrypt, compare } from "../utils/handlePassword.js";
import { tokenSign } from "../utils/handleJwt.js";
import { validatePartialUser, validateUser } from "../validators/users.js";

const register = async (req, res, next) => {
  {
    const { body } = req;

    try {
      const validate = validateUser(body);
      if (!validate.success) {
        const error = new Error();
        error.name = "ValidationBodyRequestError";
        error.issues = validate.error.issues;
        throw error;
      }

      const { name, age, email, password, role } = body;

      const encryptedPassword = await encrypt(password);

      const user = {
        name,
        age,
        email,
        password: encryptedPassword,
        role,
      };

      const newUser = await UsersModel.create(user);
      newUser.set("password", undefined, { strict: false });

      const token = await tokenSign(newUser);

      res.json({ token, data: newUser });
    } catch (error) {
      console.log(error.name);
      next(error);
    }
  }
};

const login = async (req, res, next) => {
  const { body } = req;

  try {
    const validate = validatePartialUser(body);
    if (!validate.success) {
      const error = new Error();
      error.name = "ValidationBodyRequestError";
      error.issues = validate.error.issues;
      throw error;
    }

    const { email, password } = body;

    const user = await UsersModel.findOne({ email }).select(
      "password name role email"
    );

    if (!user) {
      const error = new Error();
      error.name = "UserNotFound";
      throw error;
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      const error = new Error();
      error.name = "InvalidPassword";
      throw error;
    }

    const token = await tokenSign(user);

    user.set("password", undefined, { strict: false });

    res.json({ token, data: user });
  } catch (error) {
    next(error);
  }
};

export { register, login };
