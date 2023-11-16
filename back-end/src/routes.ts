import { Router } from "express";
import AuthController from "./controllers/auth.controller";
import RentAreaController from "./controllers/rent-area.contrtoller";
import RentPostController from "./controllers/rent-post.controller";
import UserController from "./controllers/user.controller";
import {
  loginInputValidate,
  rentPostInputvalidate,
  signinInputValidate,
} from "./middleware/zod-validation.middleware";

const route = Router();

//user
route.get("/users/get/all", UserController.getAllUser);
route.post(
  "/user/post/register",
  signinInputValidate,
  UserController.createUser
);
route.get("/user/get/:username", UserController.getUserByUsername);

//login
route.post(
  "/user/login",
  loginInputValidate,
  AuthController.userLoginWithUsername
);

//area
route.post("/area/post/register", RentAreaController.addNewArea);
route.get("/area/get/all", RentAreaController.getAllArea);

//Rent Post
route.post(
  "/rentpost/post/register",
  rentPostInputvalidate,
  RentPostController.createRentPost
);
route.get("/rentposts/get/all", RentPostController.getAllRentPost);
route.get("/rentpost/get/:username", RentPostController.getRentPostsByUsername);
route.get("/rentpost/detail/get/:id", RentPostController.findRentPostById);
// route.delete("/rentpost/delete/:id", RentPostController.deletePostById);

/**
 * @swagger
 * /user/post/register:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /user/get/{username}:
 *   get:
 *     summary: Get the user by username
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's username
 *     responses:
 *       200:
 *         description: The user description by username
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

//\/\/\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

//-------------------------------------------------------User Credential schema----------------------------------------------------------
/**
 * @swagger
 * components:
 *   schemas:
 *     UserCredential:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: User username (username should be unique for everyone)
 *         password:
 *           type: string
 *           description: User password
 *       example:
 *         username: jhondoe
 *         password: xxxxxxx
 */
/**
 * @swagger
 * tags:
 *   name: UserCredential
 *   description: The user login manage API
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     tags: [UserCredential]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCredential'
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

//\/\/\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

//-------------------------------------------------------Rent Area schema----------------------------------------------------------
/**
 * @swagger
 * components:
 *   schemas:
 *     RentArea:
 *       type: object
 *       required:
 *         - area
 *       properties:
 *         area:
 *           type: string
 *           description: Add a new location
 *       example:
 *         area: Patuakhali
 */
/**
 * @swagger
 * tags:
 *   name: RentArea
 *   description: The rent area manage API
 */

/**
 * @swagger
 * /area/post/register:
 *   post:
 *     summary: Create a new Rent area
 *     tags: [RentArea]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RentArea'
 *     responses:
 *       200:
 *         description: The rent area was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RentArea'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /area/get/all:
 *   get:
 *     summary: Returns the list of all the registered rent locations
 *     tags: [RentArea]
 *     responses:
 *       200:
 *         description: The list of the rent area
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RentArea'
 */

//\/\/\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

//-------------------------------------------------------Rent Post schema----------------------------------------------------------
/**
 * @swagger
 * components:
 *   schemas:
 *     RentPost:
 *       type: object
 *       required:
 *         - heading
 *         - description
 *         - rent
 *         - bed
 *         - bath
 *         - size
 *         - image
 *         - rentAreaName
 *       properties:
 *         heading:
 *           type: string
 *           description: Add a heading
 *         description:
 *           type: string
 *           description: Add a description
 *         rent:
 *           type: number
 *           description: Add your rent price
 *         bed:
 *           type: number
 *           description:
 *         bath:
 *           type: number
 *           description:
 *         size:
 *           type: number
 *           description:
 *         image:
 *           type: string
 *           description: base 64 image
 *         rentAreaName:
 *           type: string
 *           description: Add your location
 *       example:
 *         heading: Studio Apartment for Rent
 *         description: The corresponding flat for rent covers a 500  Square Feet area as a whole having facilities that come along with this splendid building. There are 1 bed, 1 bath and the kitchen room for the occupant who seeks for a spacious cooking area. A large and airy living space is sited in that flat having ample space to place your enjoyable family times. The flat also assures the best quality washroom fittings for guaranteeing healthy hygiene. The flat for rent  provides the exact comfortable living that you have been looking for. The asking price for this home is BDT 12,000.
 *         rent: 12000
 *         bed: 2
 *         bath: 2
 *         size: 900
 *         image: input an image
 *         rentAreaName: Patuakhali
 *
 *
 */
/**
 * @swagger
 * tags:
 *   name: RentArea
 *   description: The rent area manage API
 */

/**
 * @swagger
 * /rentpost/post/register:
 *   post:
 *     summary: Create a new Rent Post
 *     tags: [RentPost]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RentPost'
 *     responses:
 *       200:
 *         description: The rent post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RentPost'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /rentposts/get/all:
 *   get:
 *     summary: Returns the list of all the registered rent posts
 *     tags: [RentPost]
 *     responses:
 *       200:
 *         description: The list of the rent posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RentPost'
 */

/**
 * @swagger
 * /rentpost/get/{username}:
 *   get:
 *     summary: Get the rent post by username
 *     tags: [RentPost]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's username
 *     responses:
 *       200:
 *         description: The user rent post by username
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RentPost'
 *       404:
 *         description: The user was not found
 */

export default route;
