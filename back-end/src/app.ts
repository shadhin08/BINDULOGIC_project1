require("dotenv").config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import route from "./routes";
import logger from "./utls/logger";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import apiRoutes from "./utls/api-routes";

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

// Define Swagger options
const options = {
  definition: {
    openapi: "3.0.0", // specify the OpenAPI version
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
      description: "API documentation for your Node.js application",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  }, // Specify the path to your route files here
  // Path to the API specs
  apis: apiRoutes,
};

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);
// console.log(swaggerSpec);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(route);

const port = process.env.PORT || 8080;
app.listen(port, async () => {
  // dbconnection;
  logger.info(`Connected to ${port}`);
});
