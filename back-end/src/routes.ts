import { Router } from "express";
import AuthController from "./controllers/auth.controller";
import RentAreaController from "./controllers/rent.area.contrtoller";
import RentPostController from "./controllers/rent.post.controller";
import UserController from "./controllers/user.controller";

const route=Router()

route.post("/user/post/register", UserController.createUser);
route.get("/user/get/:username", UserController.getUserByUsername);
// route.get("/users/get/all", UserController.getAllUser);

route.post("/user/login", AuthController.userLoginWithUsername);

route.post("/area/post/register", RentAreaController.addNewArea);
route.get("/area/get/all", RentAreaController.getAllArea);

route.post("/rentpost/post/register", RentPostController.createRentPost);
route.get("/rentposts/get/all", RentPostController.getAllRentPost);
route.get("/rentpost/get/:username", RentPostController.getRentPostsByUsername);
// route.delete("/rentpost/delete/:id", RentPostController.deletePostById);

export default route