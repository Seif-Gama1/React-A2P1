const JWT = require('jsonwebtoken');
const GenericMethods = require("../models/generic.js");
const userModel = require("../models/User.js");
const AppError = require('../utilities/appError.js');

const JWT_SECRET = "983b8345b8b1fa55d0e4fa4bac7b575ed24049b327f3da16a76872210ea17d12516754a5f604ab8a18bcbd4628717444de978bd5d5077836b3273d6b497bc21b85aadb5fd23bf59875fc7506753854902e809c6844bfda59d505681a71e089df489af55b3eeb566a0fcbf047bf36a3e54de593a263466a185bb6370440415514917f56d053103620f6ef60a4704b0dcf5081a04388eb851b4528b78bfd3c2a100af90616db0ffe6750cd49a64e39a3f888a60c0bdd859ddcceccfcdf628db9051450c36d80b051deee78fe9f49dafcea76cd0589d302c5b98449782a0830de0d772afcdaa80be1e2d7e713baaccef612d65c76eb6e6cbce5ca7d2e777327f200";

const userMethods = new GenericMethods(userModel);

const protectedMVCRoutes = async (req, res, next) => {
    try{
        // 1.check if token exists
        const token = req.cookies.token;
        // 2.verify token
        const { id } = JWT.verify(token, JWT_SECRET);
        // 3. check if user still exist
        const user = await userMethods.getById(id);    
        if(!user || user.role !== "admin"){
            return res.status(401).render("error", {
                message: "401 You are not authorized to access this", 
                back_url:"/register/signup"
            });
        }
        return next(); //now goes to next middleware which is mvcRoutes
    }catch (e){
        res.status(401).render("error", {
                message: "401 You are not authorized to access this", 
                back_url:"/register/signup"
            });
    }  
};

const protectedAPIRoutes = async (req, res, next) => {
    try{
        // 1.check if token exists
        let token = req.headers.authorization;
        token = token && token.split(" ")[1];
        if(!token){
            new AppError("401 You are not authorized to access this", 401);
        }
        // 2.verify token
        const { id } = JWT.verify(token, JWT_SECRET);
        // 3. check if user still exist
        const user = await userMethods.getById(id);
        if(!user){
            //this line makes u go to next middleware that takes param err
            throw new AppError("401 You are not authorized to access this", 401);
        }
        
        next(); //instead this one goes to next middleware which is mvcRoutes
    }catch (e){
        next(e);
    }  
};

module.exports = {
    protectedMVCRoutes,
    protectedAPIRoutes,
}