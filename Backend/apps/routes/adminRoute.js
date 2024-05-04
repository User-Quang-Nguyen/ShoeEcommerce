const express = require('express')
const router = express.Router()
const CheckLogin = require("../middlewares/checkLogin")
const CheckFormData = require("../middlewares/checkFormData")
const ShoeController = require("../controllers/shoeController")
const OrderController = require("../controllers/orderController")

router.post("/shoe", CheckLogin.isAdmin, CheckFormData.addShoe, ShoeController.addShoe);
router.put("/shoe", CheckLogin.isAdmin, CheckFormData.updateShoe, ShoeController.updateShoe);
router.delete("/shoe", CheckLogin.isAdmin, ShoeController.deleteShoe);
router.put("/order", CheckLogin.isAdmin, CheckFormData.updateStateOrder, OrderController.updateStateOrder);

module.exports = router;