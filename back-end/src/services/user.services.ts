import { IUserInterface } from "../interfaces/user.interfaces";

import { PrismaClient } from "@prisma/client";
import logger from "../utls/logger";
const prisma = new PrismaClient();

const saveUser = async (data: IUserInterface) => {
  try {
    // DANGER ZONE
    // await prisma.user.deleteMany();

    const { firstName, lastName, username, email, password, image } = data;

    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        image: image,
      },
      select: {
        firstName: true,
        lastName: true,
        username: true,
        image: true,
        email: true,
      },
    });
    return user;
  } catch (error: any) {
    logger.error(error.message);
    return null;
  }
};

const findAllusers = async () => {
  try {
    const allUsers = prisma.user.findMany({
      select: { firstName: true, lastName: true, username: true, email: true },
    });
    // console.log(allUsers)
    return allUsers;
  } catch (error: any) {
    logger.error(error.message);
    return null;
  }
};
const findUserByUsername = async (target: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: target,
      },
      select: {
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        image: true,
      },
    });
    return user;
  } catch (error: any) {
    logger.error(error.message);
    return null;
  }
};

const Userservices = { saveUser, findAllusers, findUserByUsername };
export default Userservices;
