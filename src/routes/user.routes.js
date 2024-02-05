const express = require("express");
const { signup, signin, getAllUsers } = require("../controllers/user.controller");
// const authMiddleware = require("../middlewares/auth.middleware.js")
const userRouter = express.Router();

userRouter.post("/signup", signup)
userRouter.post("/signin", signin)
userRouter.get("/getusers", getAllUsers);

module.exports = userRouter;