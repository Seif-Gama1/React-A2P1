const userModel = require("../../models/User.js");
const GenricMethods = require("../../models/generic.js");
const JWT = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const AppError =  require("../../utilities/appError.js");
const asyncCatch =  require("../../utilities/asyncCatch.js");

const userMethods = new GenricMethods(userModel);

const JWT_SECRET = "983b8345b8b1fa55d0e4fa4bac7b575ed24049b327f3da16a76872210ea17d12516754a5f604ab8a18bcbd4628717444de978bd5d5077836b3273d6b497bc21b85aadb5fd23bf59875fc7506753854902e809c6844bfda59d505681a71e089df489af55b3eeb566a0fcbf047bf36a3e54de593a263466a185bb6370440415514917f56d053103620f6ef60a4704b0dcf5081a04388eb851b4528b78bfd3c2a100af90616db0ffe6750cd49a64e39a3f888a60c0bdd859ddcceccfcdf628db9051450c36d80b051deee78fe9f49dafcea76cd0589d302c5b98449782a0830de0d772afcdaa80be1e2d7e713baaccef612d65c76eb6e6cbce5ca7d2e777327f200";
const EXPIRES_IN = "90d";

const signUp = asyncCatch(async (req,res) => {    
    const isUser = await userModel.findOne({email: req.body.email});
    if(isUser){
        throw new AppError("this email is already in use", 400);
    }
    // hash password
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const user = await userMethods.create(req.body);
    // generate token
    const token = JWT.sign({id: user.id}, JWT_SECRET , {expiresIn: EXPIRES_IN})
    
    res.status(200).json({
        status: "success",
        user,
        token,
    });
});

const logIn = asyncCatch(async (req, res) => {
    //get User by email
    const user = await userModel.findOne({ email: req.body.email });
  
    //check Password match Form pasword
    if (!user) {
      throw new AppError("This email doesn't exist!", 404);
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
  
    if (!isPasswordMatch){
        throw new AppError("There seems to be an issue with either your email or your password.", 400);
    }
  
    //create JWT
    const token = JWT.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: EXPIRES_IN,
    });
    res.status(200).json({
        status: "success",
        user,
        token,
    });
});

const forgetPassword = asyncCatch(async (req, res, next) => {
    //1 -check user is exist
    const user = await userModel.findOne({ email: req.body.email });
    //check Password match Form pasword
    if (!user) {
      throw new AppError("this email is not exists", 400);
    }
    //2- generate random token
    const resetToken = crypto.randomBytes(32).toString("hex");
  
    // Hash the token and set it on the user model
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
  
    const updatedUser = await user.save({ validateBeforeSave: false });
    //3- send token to user's email.
    //Nodemailer
  
    res.status(200).json({
      status: "success",
      message: "the token has been send to the email successfully",
    });
  });

module.exports = {
    signUp,
    logIn,
    forgetPassword,
}