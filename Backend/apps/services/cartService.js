const Cart = require("../models/cart");
const ShoeService = require("../services/shoeService")

function getCartByUser(userid) {
    return new Promise((resolve, reject) => {
        Cart.getCartByUser(userid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function getCartItemByUser(cartid) {
    return new Promise((resolve, reject) => {
        Cart.getCartItemByUser(cartid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function getCartData(userid) {
    try {
        const cart = await getCartByUser(userid); // array
        if (cart.length === 0) return null;
        const cartshoe = await getCartItemByUser(cart[0].id); //array
        const shoes = await Promise.all(cartshoe.map(async (shoe, index) => {
            const shoedetail = await ShoeService.getItemById(shoe.shoeid);
            shoedetail[0].quantity = cartshoe[index].quantity;
            return shoedetail[0];
        }))
        const result = {};
        result.userid = cart[0].userid;
        result.status = cart[0].status;
        result.items = shoes;
        return result;
    } catch (err) {
        throw new Error(err);
    }
}

function addToCart(userid) {
    return new Promise((resolve, reject) => {
        Cart.addToCart(userid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function addToCartshoe(formData, cartid) {
    return new Promise((resolve, reject) => {
        Cart.addToCartshoe(formData, cartid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function checkUserUpdate(cartshoeid) {
    try {
        const cartshoe = await new Promise((resolve, reject) => {
            Cart.getCartshoeById(cartshoeid, (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })

        const cartid = cartshoe[0].cartid;
        const cart = await new Promise((resolve, reject) => {
            Cart.getCartById(cartid, (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })

        const userid = cart[0].userid;
        return userid;
    } catch (err) {
        throw new Error(err);
    }
}

function updateQuantity(quantity, id) {
    return new Promise((resolve, reject) => {
        Cart.updateQuantity(quantity, id, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function addItems(userid, formData) {
    try {
        const cartTable = await getCartByUser(userid);
        let cartid = -1;
        let cartshoeid = -1;
        let quantity = 0;
        if (cartTable.length === 0) {
            const data = await addToCart(userid);
            cartid = data.insertId;
        } else {
            cartid = cartTable[0].id;
        }

        const cartshoeTable = await getCartItemByUser(cartid);
        if (cartshoeTable.length != 0) {
            cartshoeTable.map((item) => {
                if (item.shoeid == formData.shoeid) {
                    cartshoeid = item.id;
                    quantity = item.quantity;
                }
            })
        }
        if (cartshoeid != -1) {
            await updateQuantity(formData.quantity + quantity, cartshoeid);
        } else {
            await addToCartshoe(formData, cartid);
        }
        return true;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}

function deleteToCartshoe(cartid) {
    return new Promise((resolve, reject) => {
        Cart.deleteToCartshoe(cartid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function deleteToCart(userid) {
    return new Promise((resolve, reject) => {
        Cart.deleteToCart(userid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    getCartData,
    getCartByUser,
    addItems,
    updateQuantity,
    checkUserUpdate,
    deleteToCart,
    deleteToCartshoe,
}