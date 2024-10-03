const express = require("express");
const router =  express.Router();

// product controller
const Controller = require("../controllers/user.js");

router.get("/register/signup", Controller.renderSignUpView);
router.get("/register/signin", Controller.renderSignInView);
router.post("/register/signup", Controller.createUser);
router.post("/register/signin", Controller.logIn);
module.exports = router;