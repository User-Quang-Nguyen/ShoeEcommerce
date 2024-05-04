const express = require('express');
const router = express.Router();
const ShoeController = require("../controllers/shoeController")

router.get("/:id", ShoeController.getItemById);
module.exports = router;