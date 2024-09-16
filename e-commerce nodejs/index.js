//index is basically the main JS file 

//express -> framework based on Nodejs to help make life easier

const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const app = express(); //returns an object containing alot of functions to use
//MVCroutes
const mvcRotues = require("./routes/mvcRoutes.js");
const productsRouter = require("./routes/productRoutes.js");
const categoriesRouter = require("./routes/categoryRoutes.js");
const authRouter = require("./routes/userRouter.js");
//API Routes
const connectDB = require('./models/db.js');
const apiProductRouter = require("./routes/api/product.js");
const { protectedRoutes } = require('./middleware/protectedRoutes.js');

dotenv.config({ path: "./config.env" }); //what does this do??

// Template Engine: pug/ejs both deal with Nodejs and Js
// it helps combining data with the engine
app.set("view engine", "pug");

// GLOBAL MIDDLEWARES
//this line tells browser to go look in dirname/public for all files u want
app.use(express.static(`${__dirname}/public`)); // in our case we wanted to give browser the global.css used in pug (which is translated to html) files.
app.use(express.urlencoded({ extended: true })); //fix console.log in product.js (t2reban)
app.use(cookieParser());
const port = 8000;

// each router here is also a global middleware
// app.use('/', authRouter, protectedRoutes, mvcRotues, productsRouter,categoriesRouter) 
app.use("/api", apiProductRouter);
app.use(
  authRouter,
  protectedRoutes,
  mvcRotues,
  productsRouter,
  categoriesRouter
);

connectDB();

app.listen(port , () => {
    console.log("This server is running on :"+ port);
})