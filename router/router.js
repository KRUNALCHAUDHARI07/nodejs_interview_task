const express = require("express");
const router = express.Router();
const userController = require("../controller/User.Controller");
const UserController = new userController();

router.post("/register",(req,res) => UserController.Register(req,res));

router.post("/login",(req,res)=> UserController.login(req,res));

router.put("/changepassword",(req,res) => UserController.changePassword(req,res));

module.exports = router;