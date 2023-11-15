import { Request, Response } from "express";
import Userservices from "../services/user.services";
import logger from "../utls/logger";

const createUser =async(req: Request, res: Response)=>
{
    try 
    {
        //username validation

        //email validation

        //save user to database
        const result=await Userservices.saveUser(req.body);
        if(result)
        {
            res.cookie("username", result.username);
            res.status(200).send(result);
        }
        else
            res.status(409).send("Username or email maybe already exist or something is missing...!");
    } 
    catch(error: any) 
    {
        res.status(400).send("Something went wrong...");
        logger.error(error.message);
    }
}

const getAllUser=async(req: Request, res: Response)=>
{
    try 
    {
        const result=await Userservices.findAllusers();
        if(result)
            res.status(200).send(result);
        else
            res.status(404).send("Users not found...");
    } 
    catch(error: any) 
    {
        res.status(400).send("Something went wrong...");
        logger.error(error.message);
    }
}
const getUserByUsername=async(req: Request, res: Response)=>
{
    try 
    {
        const target=req.params.username;
        const result=await Userservices.findUserByUsername(target);
        if(result)
            res.status(200).send(result);
        else
            res.status(404).send("User not found...");
    } 
    catch(error: any) 
    {
        res.status(400).send("Something went wrong...");
        logger.error(error.message);
    }
}



const UserController={ createUser, getAllUser, getUserByUsername }
export default UserController