const express = require('express')
const router = express.Router()
const CheckLogin = require("../middlewares/checkLogin")
const CheckFormData = require("../middlewares/checkFormData")
const ShoeController = require("../controllers/shoeController")
const OrderController = require("../controllers/orderController")
const UserController = require("../controllers/userController")

router.post("/shoe", CheckLogin.isAdmin, CheckFormData.addShoe, ShoeController.addShoe);
router.put("/shoe", CheckLogin.isAdmin, CheckFormData.updateShoe, ShoeController.updateShoe);
router.delete("/shoe", CheckLogin.isAdmin, ShoeController.deleteShoe);
router.get("/shoe", CheckLogin.isAdmin, ShoeController.getAllItemsDetail);
router.put("/order", CheckLogin.isAdmin, CheckFormData.updateStateOrder, OrderController.adminUpdateStateOrder);
router.get("/user", CheckLogin.isAdmin, UserController.getAllUser);
router.delete("/user", CheckLogin.isAdmin, CheckFormData.deleteUser, UserController.deleteUser);
router.get("/order", CheckLogin.isAdmin, OrderController.getAllOrder);
router.put("/shoedetail", CheckLogin.isAdmin, ShoeController.updateShoeDetail);
router.post("/shoedetail", CheckLogin.isAdmin, ShoeController.insertShoeDetail);


module.exports = router;