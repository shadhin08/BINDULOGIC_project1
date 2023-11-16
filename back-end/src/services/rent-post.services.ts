import { IRentPostInterface } from "../interfaces/rent-post.interfaces";
import { PrismaClient } from "@prisma/client";
import logger from "../utls/logger";
import { IUserInterface } from "../interfaces/user.interfaces";
const prisma = new PrismaClient();

const saveRentPost = async (data: IRentPostInterface, user: string) => {
  try {
    // DANGER ZONE
    // await prisma.rentPost.deleteMany();

    const { heading, description, rent, bed, bath, size, rentAreaName, image } =
      data;
    // console.log(image, user);

    const post = await prisma.rentPost.create({
      data: {
        heading: heading,
        description: description,
        rent: rent,
        bed: bed,
        bath: bath,
        size: size,
        image: image,

        userUsername: user,
        rentAreaName: rentAreaName,
      },
    });
    return post;
  } catch (error: any) {
    logger.error(error.message);
    return null;
  }
};
const findRentPostsByUsername = async (target: string) => {
  try {
    const user = await prisma.rentPost.findMany({
      where: {
        userUsername: target,
      },
    });
    return user;
  } catch (error: any) {
    logger.error(error.message);
    return null;
  }
};
const getAllrentPost = async () => {
  try {
    const allPost = await prisma.rentPost.findMany({
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
    });
    return allPost;
  } catch (error: any) {
    logger.error(error.message);
    return null;
  }
};
const deleteRentPostById = async (target: string) => {
  try {
    const result = await prisma.rentPost.delete({
      where: {
        id: target,
      },
    });
    return result;
  } catch (error: any) {
    logger.error(error.message);
    return null;
  }
};
const RentPostServices = {
  saveRentPost,
  findRentPostsByUsername,
  getAllrentPost,
  deleteRentPostById,
};
export default RentPostServices;
