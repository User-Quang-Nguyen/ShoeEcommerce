const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");

router.get("", CategoryController.getAllCategories);

module.exports = router;