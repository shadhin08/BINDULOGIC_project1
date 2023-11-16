import { PrismaClient } from "@prisma/client";
import logger from "../utls/logger";
const prisma = new PrismaClient();

const findUserByUsername = async (target: string) => {
  try {
    const user = prisma.user.findUnique({
      where: {
        username: target,
      },
    });
    return user;
  } catch (error: any) {
    logger.error(error.message);
    return null;
  }
};

const comparePassword = async (userPassword: string, inputPassword: string) => {
  try {
    if (userPassword === inputPassword) return true;
    else return false;
  } catch (error: any) {
    logger.error(error.message);
    return null;
  }
};
const AuthServices = { comparePassword, findUserByUsername };
export default AuthServices;
