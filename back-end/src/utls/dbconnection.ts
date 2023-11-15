import { PrismaClient } from '@prisma/client'
import logger from './logger'
const prisma = new PrismaClient()

const dbconnection=async ()=>
{
    await prisma.rentPost.findMany()
    logger.info("Database connected");
}
dbconnection()
    .catch(e=>logger.error(e.message))
    .finally(async ()=>await prisma.$disconnect())

export default dbconnection
