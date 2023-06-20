const UserRouter = require("express").Router() ;
const UserController = require("./UserController.js");

UserRouter.get("/", UserController.getAllUsers);
UserRouter.get("/:id", UserController.getUserById);
UserRouter.post("/", UserController.addUser);
UserRouter.put("/:password", UserController.updateUser);
UserRouter.delete("/:password", UserController.deleteUser); 

module.exports = UserRouter;