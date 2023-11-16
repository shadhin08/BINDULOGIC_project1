import { NextFunction, Request, Response } from "express";
import { fromZodError } from "zod-validation-error";
import {
  RentPostSchema,
  UserCredentialSchema,
  UserSchema,
} from "../zod-interfaces/zod-interfaces";

const signinInputValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UserSchema.parse(req.body);
    next();
  } catch (error) {
    const result = UserSchema.safeParse(req.body);
    if (result.success == false) {
      res.status(401).send(fromZodError(result.error).message);
    } else next();
  }
};

const loginInputValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UserCredentialSchema.parse(req.body);
    next();
  } catch (error) {
    const result = UserCredentialSchema.safeParse(req.body);
    if (result.success == false) {
      res.status(401).send(fromZodError(result.error).message);
    } else next();
  }
};

const rentPostInputvalidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    RentPostSchema.parse(req.body);
    next();
  } catch (error) {
    const result = RentPostSchema.safeParse(req.body);
    if (result.success == false) {
      res.status(401).send(fromZodError(result.error).message);
    } else next();
  }
};

export { signinInputValidate, loginInputValidate, rentPostInputvalidate };
