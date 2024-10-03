const express = require("express");
const router =  express.Router();

const productEndPoints = require("../../api/user/index.js");

router.post("/signup", productEndPoints.signUp); //createUser
router.post("/signin", productEndPoints.logIn);
router.post("/forgetpass", productEndPoints.forgetPassword);

module.exports = router; 
