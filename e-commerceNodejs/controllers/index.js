//===home.js
const productModel = require("../models/Product");

const controller = (req,res) => {
    res.status(200).render("index"); //passes products as parameter to index file
}

module.exports = controller;