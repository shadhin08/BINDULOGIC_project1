import { Request, Response } from "express";
import AuthServices from "../services/auth.services";
import logger from "../utls/logger";

const userLoginWithUsername = async (req: Request, res: Response) => {
  try {
    const username: string = req.body.username;
    const password: string = req.body.password;
    // console.log(req.body);

    const user = await AuthServices.findUserByUsername(username);
    if (user) {
      const isPasswordCurrect = await AuthServices.comparePassword(
        user.password,
        password
      );
      if (isPasswordCurrect) {
        res.cookie("username", username);
        res.status(200).send(user);
      } else {
        res.clearCookie("username");
        res.status(401).send("Wrong password");
      }
    } else {
      res.clearCookie("username");
      res.status(404).send("User not found");
    }
  } catch (error: any) {
    res.clearCookie("username");
    logger.error(error.message);
    res.status(400).send("Something went wrong...");
  }
};

const AuthController = { userLoginWithUsername };
export default AuthController;
