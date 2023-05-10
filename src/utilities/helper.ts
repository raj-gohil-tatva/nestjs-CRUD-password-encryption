import { genSalt, hash, compare } from 'bcrypt';

/**
 * Function to encrypt the password.
 * @param password Plain password.
 * @returns Encrypted to be stored in the database.
 */
export const encryptPassword = async (password: string): Promise<string> => {
  try {
    const saltHash = await genSalt(11);
    return hash(password, saltHash);
  } catch (error) {
    console.error(`Unable to hash the password due to ${error.message}`);
    throw new Error(error);
  }
};

/**
 * Function to match the plain and encrypted password.
 * @param password plain password.
 * @param hashedPassword hashed password from database.
 * @returns true if password matched else false.
 */
export const compareHashedPassword = (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  try {
    return compare(password, hashedPassword);
  } catch (error) {
    console.error(`Unable to decrypt the password due to: ${error.message}`);
  }
};
