
import { PrismaClient } from '@prisma/client'
import logger from "../utls/logger";
const prisma = new PrismaClient()

const saveArea=async(areaName: string)=>
{
    try 
    {
        // DANGER ZONE
        // await prisma.rentArea.deleteMany();

        const area= await prisma.rentArea.create(
            {data: 
                {
                    area: areaName
                }
        })
        return area
    } 
    catch(error: any)
    {
        logger.error(error.message);
        return null;
    }
}

const findAllArea=async()=>
{
    try 
    {
        const allArea=await prisma.rentArea.findMany();
        return allArea;
    } 
    catch(error: any) 
    {
        logger.error(error.message);
        return null
    }
}
const RentAreaServices={ saveArea, findAllArea }
export default RentAreaServices;