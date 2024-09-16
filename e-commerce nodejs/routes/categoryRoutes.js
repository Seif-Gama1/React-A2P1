const express = require("express");
const router =  express.Router();

// product controller
const Controller = require("../controllers/category.js");

const base = "/categories"

router.get(base , Controller.mainView);
// router.get(`${base}/:michol` , Controller.viewSingleCategoryById);
router.get(`${base}/create`, Controller.renderCreateView);
router.get(`${base}/:id/update`, Controller.renderUpdateView);
router.get(`${base}/:id/delete`, Controller.deleteCategory);

router.post(`${base}/create`, Controller.uploadMiddleware , Controller.createCategory);

router.post(`${base}/:id/update`, Controller.uploadMiddleware , Controller.updateCategory);

module.exports = router; 