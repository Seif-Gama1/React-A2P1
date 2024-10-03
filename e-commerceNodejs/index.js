//index is basically the main JS file 

//express -> framework based on Nodejs to help make life easier

const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./models/db.js');
const dotenv = require("dotenv");
const app = express(); //returns an object containing alot of functions to use

//Security middlewares
const rateLimit =  require("express-rate-limit"); //ANTI DDOS ATTACK 
const helmet = require("helmet"); //this is also a middleware 
const mongoSanitize = require("express-mongo-sanitize");
// const xssClean = require("xss-clean"); //deprecated
const { xss } = require("express-xss-sanitizer");
const hpp = require("hpp");

//MVCroutes
const mvcRotues = require("./routes/mvcRoutes.js");
const productsRouter = require("./routes/productRoutes.js");
const categoriesRouter = require("./routes/categoryRoutes.js");
const registerRouter = require("./routes/userRouter.js");
//API Routes
const apiProductRouter = require("./routes/api/product.js");
const apiCategoryRouter = require("./routes/api/category.js");
const apiUserRouter = require("./routes/api/user.js");
const protectedRoutes = require('./middleware/protectedRoutes.js');
const AppError = require('./utilities/appError.js');
const globalError     = require('./middleware/globalError.js');

dotenv.config({ path: "./config.env" }); //what does this do??

// Template Engine: pug/ejs both deal with Nodejs and Js
// it helps combining data with the engine
app.set("view engine", "pug");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Specify allowed methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Specify allowed headers
  next();
});

// GLOBAL MIDDLEWARES
app.use(express.json());
//this line tells browser to go look in dirname/public for all files u want
app.use(express.static(`${__dirname}/public`)); // in our case we wanted to give browser the global.css used in pug (which is translated to html) files.
app.use(express.urlencoded({ extended: true })); //fix console.log in product.js (t2reban)
app.use(cookieParser());

const limiter = rateLimit({
  max:100,
  windowMS: 60 * 60 * 1000,
  message: "Too Many Requests try again in 1 HOUR",
});

app.use(limiter);
app.use((helmet()));
//helmet -> it puts some response in header with securiy related info
app.use(mongoSanitize()); // anti SQL/NOSQL injection attack
// XSS -> cross site script which aims to send script/html to be executed inside DB of server .. then be called later to do wrong stuff
// app.use(xssClean()); //deprecated
app.use(xss());
app.use(hpp());
//hpp

//environemnt vairables
const port = process.env.PORT || 3000;

// each router here is also a global middlewares
// app.use("/api", apiUserRouter, protectedRoutes.protectedAPIRoutes, apiProductRouter, apiCategoryRouter); // old
app.use("/api", apiUserRouter, apiProductRouter, apiCategoryRouter); //(removed API protection routes)
app.use(
  "/",
  registerRouter,
  protectedRoutes.protectedMVCRoutes,
  mvcRotues,
  productsRouter,
  categoriesRouter
);

app.all("*", (req,res,next) => {
  next(new AppError("this route is not valid", 404)); // -> this calls the app.use which has err parameter
});

//global middleware
app.use(globalError);

connectDB();

app.listen(port , () => {
  console.log("This server is running on :"+ port);
})
