const JWT = require('jsonwebtoken');
const GenericMethods = require("../models/generic.js");
const userModel = require("../models/User.js");
const {JWT_SECRET} = require('../controllers/user.js');

const userMethods = new GenericMethods(userModel);

const protectedRoutes = async (req, res, next) => {
    try{
        // 1.check if token exists
        const token = req.cookies.token;
        // 2.verify token
        const {id} = JWT.verify(token, JWT_SECRET); //if correct it returns id else throws error
        // 3. check if user still exist
        const user = await userMethods.getById(id);
        
        if(!user || user.role !== "admin"){
            return res.status(401).render("error", {
                message: "401 You are not authorized to access this", 
                back_url:"/register/signup"
            });
        }
        //else{
        next(); //now goes to next middleware which is mvcRoutes
    }catch (e){
        res.status(401).render("error", {
                message: "401 You are not authorized to access this", 
                back_url:"/register/signup"
            });
    }  
};

module.exports = {
    protectedRoutes,
}