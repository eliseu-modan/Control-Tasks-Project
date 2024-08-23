const express = require("express");
const userRoutes = express.Router();
const userController = require("../controllers/ControllerLogin.js");
const registerController = require("../controllers/ControllerRegister.js");
const { isAdmin } = require("../middlewares/authAdmin.js");

userRoutes.post("/auth/login", userController.login);
userRoutes.post("/auth/register", isAdmin, registerController.register);
userRoutes.get("/auth/getUsers", isAdmin, registerController.getUsers);
userRoutes.delete(
  "/auth/deleteUser/:card",
  isAdmin,
  registerController.deleteUsers
);
userRoutes.patch("/auth/editUser/:id", isAdmin, registerController.editUser);
userRoutes.patch(
  "/auth/editPassword/:id",
  isAdmin,
  registerController.editPassword
);
module.exports = userRoutes;
