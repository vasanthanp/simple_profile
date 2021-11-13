const route = require("express").Router();
const {
  signinController,
  signupController,
  getUserController,
  updateUserController,
} = require("../controllers/userController");
route.post("/api/v1/signup", signupController);
route.post("/api/v1/signin", signinController);
route.post("/api/v1/profile", getUserController);
route.post("/api/v1/update", updateUserController);

module.exports = route;
