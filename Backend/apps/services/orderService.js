const Order = require("../models/order");
const Shoe = require("../models/shoe");
const CartService = require("../services/cartService")

function calculate(items) {
    try {
        let sum = 0;
        items.map((item) => {
            sum += item.quantity * item.price;
        });
        return sum;
    } catch (err) {
        throw new Error(err.message);
    }
}

function addToOrderTable(userid, total) {
    return new Promise((resolve, reject) => {
        Order.addToOrderTable(userid, total, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function addToOrderDetailTable(orderid, item) {
    return new Promise((resolve, reject) => {
        Order.addToOrderDetailTable(orderid, item, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function getOrderById(userid) {
    return new Promise((resolve, reject) => {
        Order.getOrderById(userid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function getOrderDetailById(orderid) {
    return new Promise((resolve, reject) => {
        Order.getOrderDetailById(orderid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function updateQuantityShoe(quantity, id) {
    const shoe = await new Promise((resolve, reject) => {
        Shoe.getItemById(id, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
    const newQuantity = shoe[0].quantity - quantity;
    if (newQuantity < 0) {
        return false;
    }
    return new Promise((resolve, reject) => {
        Shoe.updateQuantity(newQuantity, id, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function backQuantityShoe(quantity, id) {
    const shoe = await new Promise((resolve, reject) => {
        Shoe.getItemById(id, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
    const newQuantity = shoe[0].quantity + quantity;
    if (newQuantity < 0) {
        return false;
    }
    return new Promise((resolve, reject) => {
        Shoe.updateQuantity(newQuantity, id, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function checkQuantity(items) {
    try {
        const results = await Promise.all(items.map(async (item) => {
            return updateQuantityShoe(item.quantity, item.id);
        }));
        results.forEach((result, index) => {
            if (!result) {
                const item = items[index];
                results.forEach(async (result1, index1) => {
                    if (result1) {
                        await backQuantityShoe(items[index1].quantity, items[index1].id);
                    }
                })
                throw new Error(`Không đủ số lượng cho sản phẩm ${item.name}`);
            }
        });
    } catch (err) {
        throw new Error(err.message);
    }
}

async function order(userid, items) {
    try {
        await checkQuantity(items);
        const total = await calculate(items);
        const result = await addToOrderTable(userid, total);
        const orderid = result.insertId;
        items.map(async (item) => {
            await addToOrderDetailTable(orderid, item);
        })
        const cart = await CartService.getCartByUser(userid);
        const cartid = cart[0].id;
        await CartService.deleteToCartshoe(cartid);
        await CartService.deleteToCart(userid);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getListItemOrder(userid) {
    try {
        const orders = await getOrderById(userid);

        const list = await Promise.all(orders.map(async (order) => {
            const items = await getOrderDetailById(order.id);
            result = {
                "id": order.id,
                "status": order.status,
                "items": items,
                "total": order.total,
                "createdat": order.createdat
            }
            return result;
        }))
        return list;
    } catch (err) {
        throw new Error(err.message);
    }
}

function updateStateOrder(orderid, status) {
    return new Promise((resolve, reject) => {
        Order.updateState(orderid, status, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    order,
    getListItemOrder,
    updateStateOrder,
}