const express = require('express')
const router = express.Router()
const Login = require("../middlewares/checkLogin")
const OrderController = require("../controllers/orderController")

router.post("", Login.checkLogin, OrderController.addToOrderTable);
router.get("", Login.checkLogin, OrderController.getListItemOrder);

module.exports = router;