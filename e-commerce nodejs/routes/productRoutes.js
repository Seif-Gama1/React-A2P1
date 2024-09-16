const express = require("express");
const router =  express.Router();

// product controller
const Controller = require("../controllers/products");

const base = "/products"

router.get(base , Controller.indexController);
router.get(`${base}/create`, Controller.renderCreateView);

// here uploaderFiles is a local Middleware
router.post(`${base}/create`, Controller.uploaderFiles , Controller.CreateProduct);
router.delete("/products/:id", Controller.DeleteProduct);

module.exports = router; 