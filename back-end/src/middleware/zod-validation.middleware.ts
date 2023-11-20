import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { fromZodError } from "zod-validation-error";

const inputValidate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      const result = schema.safeParse(req.body);
      if (result.success == false) {
        res.status(401).send(fromZodError(result.error).message);
      } else next();
    }
  };
};

// const signinInputValidate = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     UserSchema.parse(req.body);
//     next();
//   } catch (error) {
//     const result = UserSchema.safeParse(req.body);
//     if (result.success == false) {
//       res.status(401).send(fromZodError(result.error).message);
//     } else next();
//   }
// };

// const loginInputValidate = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     UserCredentialSchema.parse(req.body);
//     next();
//   } catch (error) {
//     const result = UserCredentialSchema.safeParse(req.body);
//     if (result.success == false) {
//       res.status(401).send(fromZodError(result.error).message);
//     } else next();
//   }
// };

// const rentPostInputvalidate = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     RentPostSchema.parse(req.body);
//     next();
//   } catch (error) {
//     const result = RentPostSchema.safeParse(req.body);
//     if (result.success == false) {
//       res.status(401).send(fromZodError(result.error).message);
//     } else next();
//   }
// };

export { inputValidate };
