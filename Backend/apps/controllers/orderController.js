const OrderService = require("../services/orderService")
const CartService = require("../services/cartService")
const jwt = require("../utils/jwt")

async function addToOrderTable(req, res) {
    try {
        const token = req.headers['authorization'];
        const infor = await jwt.verifyToken(token);
        const userid = infor.id;
        const cartInfor = await CartService.getCartData(userid);
        const items = cartInfor.items;
        await OrderService.order(userid, items);
        return res.status(200).json({ message: "Đặt hàng thành công", status: true });
    } catch (err) {
        return res.status(400).json({ message: err.message, status: false })
    }
}

async function getListItemOrder(req, res) {
    try {
        const token = req.headers['authorization'];
        const infor = await jwt.verifyToken(token);
        const userid = infor.id;
        const list = await OrderService.getListItemOrder(userid);
        return res.status(200).json(list);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Error", status: false })
    }
}

async function updateStateOrder(req, res) {
    try {
        const token = req.headers['authorization'];
        const infor = await jwt.verifyToken(token);
        const userid = infor.id;
        const { id, status } = req.body;
        const user = await OrderService.getOrderById(id);
        const realUser = user[0].userid;
        if (realUser != userid) {
            return res.status(403).json({ message: "Xác thực thất bị", state: false });
        }

        const result = await OrderService.updateStateOrder(id, status);
        if (result == false) {
            return res.status(403).json({ message: "Thất bại", state: false });
        }
        return res.status(200).json({ message: "Thành công", state: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, state: false });
    }
}

async function getMoneyOrder(req, res) {
    try {
        const token = req.headers['authorization'];
        const infor = await jwt.verifyToken(token);
        const userid = infor.id;
        const cartInfor = await CartService.getCartData(userid);
        const items = cartInfor.items;
        const money = await OrderService.calculate(items);
        return res.status(200).json(money);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Error", status: false })
    }
}

module.exports = {
    addToOrderTable,
    getListItemOrder,
    updateStateOrder,
    getMoneyOrder,
}