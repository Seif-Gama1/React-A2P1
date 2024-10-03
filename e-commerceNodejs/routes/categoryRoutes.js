const express = require("express");
const router =  express.Router();

// product controller
const categoriesController = require("../controllers/category.js");

const base = "/categories"

router.get(base , categoriesController.mainView);
router.get(`${base}/create`, categoriesController.renderCreateView);
// router.get(`${base}/:michol` , categoriesController.viewSingleCategoryById);
router.get(`${base}/:id/update`, categoriesController.renderUpdateView);
router.get(`${base}/:id/delete`, categoriesController.deleteCategory);

router.post(`${base}/create`, categoriesController.uploadMiddleware , categoriesController.createCategory);

router.post(`${base}/:id/update`, categoriesController.uploadMiddleware , categoriesController.updateCategory);

module.exports = router; 
