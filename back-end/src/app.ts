
require('dotenv').config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

import route from "./routes";
import dbconnection from "./utls/dbconnection";
import logger from "./utls/logger";

const corsOptions= 
{
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const port=process.env.PORT||8080;

app.use(route);

app.listen(port, async()=>
{
    // dbconnection;
    logger.info(`Connected to ${port}`);
})