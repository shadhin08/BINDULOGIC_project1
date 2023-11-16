export const swaggerDocs = () => {
  console.log("hit");
  //-------------------------------------------------------User schema----------------------------------------------------------
  /**
   * @swagger
   * components:
   *   schemas:
   *     User:
   *       type: object
   *       required:
   *         - firstName
   *         - lastName
   *         - username
   *         - email
   *         - image
   *         - password
   *       properties:
   *         firstName:
   *           type: string
   *           description: The user's first name
   *         lastName:
   *           type: string
   *           description: The The user's last name
   *         username:
   *           type: string
   *           description: User username (username should be unique for everyone)
   *         email:
   *           type: string
   *           description: User email (email should be unique for everyone)
   *         image:
   *           type: string
   *           description: User profile picture
   *         password:
   *           type: string
   *           description: User password
   *       example:
   *         firstName: Jhon
   *         lastName: Doe
   *         username: jhondoe
   *         email: jhon@email.com
   *         image: image url
   *         password: xxxxxxx
   */
  /**
   * @swagger
   * tags:
   *   name: User
   *   description: The user manage API
   */
  //-------------------------------------------------------Swagger Docs----------------------------------------------------------
  /**
   * @swagger
   * /users/get/all:
   *   get:
   *     summary: Returns the list of all the user
   *     tags: [User]
   *     responses:
   *       200:
   *         description: The list of the user
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */
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
};
