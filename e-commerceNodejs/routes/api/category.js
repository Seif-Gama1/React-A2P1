const express = require("express");
const router =  express.Router();

const categoryEndPoints = require("../../api/categories");
// const { uploaderFiles } = require("../../controllers/products.js");

router.get("/categories", categoryEndPoints.getAllCategories);

module.exports = router; 