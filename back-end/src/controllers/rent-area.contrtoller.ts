import { Request, Response } from "express";
import RentAreaServices from "../services/rent-area.services";
import logger from "../utls/logger";

const addNewArea = async (req: Request, res: Response) => {
  try {
    //check area is already exist or not

    //check is area is valid or not

    //save area to database
    const areaName: string = req.body.area;
    const result = await RentAreaServices.saveArea(areaName);
    if (result) res.status(200).send(result);
    else
      res
        .status(404)
        .send("Area maybe already exist or something is missing...!");
  } catch (error: any) {
    res.status(400).send("Something went wrong...");
    logger.error(error.message);
  }
};
const getAllArea = async (req: Request, res: Response) => {
  try {
    const result = await RentAreaServices.findAllArea();
    if (result) res.status(200).send(result);
    else res.status(404).send("Area not found...");
  } catch (error: any) {
    res.status(400).send("Something went wrong...");
    logger.error(error.message);
  }
};

const RentAreaController = { addNewArea, getAllArea };
export default RentAreaController;
