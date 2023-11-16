import { Request, Response } from "express";
import RentPostServices from "../services/rent-post.services";
import logger from "../utls/logger";

const createRentPost = async (req: Request, res: Response) => {
  try {
    //check user is valid or not

    //check area is valid or not

    //save post
    const user = req.cookies;
    // console.log(user)

    const result = await RentPostServices.saveRentPost(
      req.body,
      user?.username
    );
    if (result) res.status(200).send(result);
    else res.status(404).send("something is missing...!");
  } catch (error: any) {
    res.status(400).send("Something went wrong...");
    logger.error(error.message);
  }
};
const getRentPostsByUsername = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const userWithRentPosts = await RentPostServices.findRentPostsByUsername(
      username
    );
    if (userWithRentPosts) res.status(200).send(userWithRentPosts);
    else res.status(404).send("User not found");
  } catch (error: any) {
    res.status(400).send("Something went wrong...");
    logger.error(error.message);
  }
};

const getAllRentPost = async (req: Request, res: Response) => {
  try {
    const allRentPost = await RentPostServices.getAllrentPost();
    if (allRentPost) res.status(200).send(allRentPost);
    else res.status(404).send("Rent post not found");
  } catch (error: any) {
    res.status(400).send("Something went wrong...");
    logger.error(error.message);
  }
};
const deletePostById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await RentPostServices.deleteRentPostById(id);
    // console.log(result);
    if (result) res.status(200).send("Rent post deleted");
    else res.status(404).send("Rent post not found");
  } catch (error: any) {
    res.status(400).send("Something went wrong...");
    logger.error(error.message);
  }
};
const RentPostController = {
  createRentPost,
  getRentPostsByUsername,
  getAllRentPost,
  deletePostById,
};
export default RentPostController;
