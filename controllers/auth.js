import { UsersModel } from "../models/index.js";
import { encrypt, compare } from "../utils/handlePassword.js";
import { tokenSign } from "../utils/handleJwt.js";
import { validatePartialUser, validateUser } from "../validators/users.js";
import { handleError } from "../utils/handleError.js";
import { throwError } from "../utils/templateError.js";

const register = async (req, res) => {
  {
    const { body } = req;

    try {
      const validate = validateUser(body);
      if (!validate.success) {
        const { issues } = validate.error;
        throwError(
          "Error to body data request",
          "ValidationBodyRequestError",
          400,
          issues
        );
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
      handleError(res, error);
    }
  }
};

const login = async (req, res) => {
  const { body } = req;

  try {
    const validate = validatePartialUser(body);
    if (!validate.success) {
      throwError(
        "Error to body data request",
        "ValidationBodyRequestError",
        400,
        issues
      );
    }

    const { email, password } = body;

    const user = await UsersModel.findOne({ email }).select(
      "password name role email"
    );

    if (!user) {
      throwError("User not found", "NotFoundError", 404);
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throwError("Invalid password", "InvalidPassword", 400);
    }

    const token = await tokenSign(user);

    user.set("password", undefined, { strict: false });

    res.json({ token, data: user });
  } catch (error) {
    handleError(res, error);
  }
};

export { register, login };
