import bcrypt from "bcrypt";

/**
 * Encrypts a plain text password using bcrypt.
 *
 * @param {string} passwordPlain - The plain text password to be encrypted.
 * @return {Promise<string>} A promise that resolves to the hashed password.
 */
const encrypt = async (passwordPlain) => {
  const hash = await bcrypt.hash(passwordPlain, 10);
  return hash;
};

/**
 * Compares a plain text password with a hashed password.
 *
 * @param {string} passwordPlain - The plain text password to compare.
 * @param {string} hashPassword - The hashed password to compare against.
 * @return {Promise<boolean>} A promise that resolves to true if the passwords match, false otherwise.
 */
const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

export { encrypt, compare };
