const UserRouter = require("express").Router() ;
const UserController = require("./UserController.js");

UserRouter.get("/", UserController.getAllUsers);
UserRouter.get("/:id", UserController.getUserById);
UserRouter.post("/", UserController.addUser);
UserRouter.put("/:id", UserController.updateUser);
UserRouter.delete("/:id", UserController.deleteUser); 

module.exports = UserRouter;