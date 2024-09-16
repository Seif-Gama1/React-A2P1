const JWT = require('jsonwebtoken');

const userModel = require('../models/User.js');
const GenericMethods = require('../models/generic.js');

const userMethods = new GenericMethods(userModel);
const JWT_SECRET = "983b8345b8b1fa55d0e4fa4bac7b575ed24049b327f3da16a76872210ea17d12516754a5f604ab8a18bcbd4628717444de978bd5d5077836b3273d6b497bc21b85aadb5fd23bf59875fc7506753854902e809c6844bfda59d505681a71e089df489af55b3eeb566a0fcbf047bf36a3e54de593a263466a185bb6370440415514917f56d053103620f6ef60a4704b0dcf5081a04388eb851b4528b78bfd3c2a100af90616db0ffe6750cd49a64e39a3f888a60c0bdd859ddcceccfcdf628db9051450c36d80b051deee78fe9f49dafcea76cd0589d302c5b98449782a0830de0d772afcdaa80be1e2d7e713baaccef612d65c76eb6e6cbce5ca7d2e777327f200";
// const EXPIRES_IN = "90d 50h 20m";
const EXPIRES_IN = "90d";

const renderSignUpView = async (req,res) => {
    res.status(200).render("register/signup");
}

const renderSignInView = async (req,res) => {
    res.status(200).render("register/signin");
}

const createUser = async (req,res) => {
    const isUser = await userModel.findOne({email: req.body.email});
    if(isUser){
        return res.status(400).render("error", {
                message: "this email is already in use",
                back_url: "/register/signup",
            });
    }
    // hash password
    const user = await userMethods.create(req.body);
    // generate token
    const token = JWT.sign({id: user.id}, JWT_SECRET , {expiresIn: EXPIRES_IN})
    // res.cookie
    
    res.cookie("token", token);
    res.status(200).redirect("/"); //redirect to home page
}

const logIn = async (req, res) => {
    //get User by email
    const user = await userModel.findOne({ email: req.body.email });
  
    //check Password match Form pasword
    if (!user) {
      return res.status(404).render("error", {
        error: "This email does not exist!",
        back_url: "/register/signin",
      });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
  
    if (!isPasswordMatch)
      return res.status(400).render("error", {
        error:
          "There seems to be an issue with either your email or your password.",
        back_url: "/register/signin",
      });
  
    //create JWT
    const token = JWT.sign({ id: user.id }, JWT_SECERT, {
      expiresIn: EXPIRES_IN,
    });
    res.cookie("token", token).status(200).redirect("/");
  };

module.exports = {
    renderSignInView,
    renderSignUpView,
    createUser,
    JWT_SECRET,
    logIn,
}