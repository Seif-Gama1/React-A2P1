const express = require("express");
const router =  express.Router();
const homeController = require("../controllers/index");

router.get("/",homeController);

// router carries all routes
module.exports = router;

// In case received get request with https://baseURL/ execute the callback function [basically the controller(app) logic]

//since we're using express this time thus (req & res) contain even more functions than before to make ur life easier
// res.status(200).send("<h1>Welcome  from server</h1>");
/* app.get("/categories",((req,res) => {
 *     res.status(200).render("categories",{categories:categories}); 
 * }));
 * app.get("/about",((req,res) => {
 *     res.status(200).render("about"); 
 * }));
 * app.get("/orders",((req,res) => {
 *     res.status(200).render("orders"); 
 * }));
 * app.get("/reviews",((req,res) => {
 *     res.status(200).render("reviews"); 
 * }));
 * app.get("/users",((req,res) => {
 *     res.status(200).render("users"); 
 * })); */
