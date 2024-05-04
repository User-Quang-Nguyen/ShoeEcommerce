const db = require("../../config/database")
const conn = db.getConnection()

const Cart = {
    getCartByUser: (userid, callback) => {
        const query = `SELECT * FROM cart WHERE userid = ?`;
        conn.query(query, [userid], (err, result) => {
            if (err) return callback(err);
            callback(null, result)
        })
    },

    getCartItemByUser: (cartid, callback) => {
        const query = `SELECT * FROM cart_shoe WHERE cartid = ?`;
        conn.query(query, [cartid], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        })
    },

    addToCart: (userid, callback) => {
        const query = `INSERT INTO cart (userid) VALUES (?)`;
        conn.query(query, [userid], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        })
    },

    addToCartshoe: (formData, cartid, callback) => {
        const query = `INSERT INTO cart_shoe (cartid, shoeid, quantity) VALUES (?, ?, ?)`;
        conn.query(query, [cartid, formData.shoeid, formData.quantity], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        })
    },

    updateQuantity: (quantity, id, callback) => {
        const query = `UPDATE cart_shoe SET quantity = ? WHERE id = ?`;
        conn.query(query, [quantity, id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        })
    },

    getCartshoeById: (cartshoeid, callback) => {
        const query = `SELECT * FROM cart_shoe WHERE id = ?`;
        conn.query(query, [cartshoeid], (err, result) => {
            if(err) return callback(err);
            callback(null, result);
        })
    },

    getCartById: (cartid, callback) => {
        const query = `SELECT * FROM cart WHERE id = ?`;
        conn.query(query, [cartid], (err, result) => {
            if(err) return callback(err);
            callback(null, result);
        })
    },

    deleteToCart: (userid, callback) => {
        const query = `DELETE FROM cart WHERE userid = ?`;
        conn.query(query, [userid], (err, result) => {
            if(err) return callback(err);
            callback(null, result);
        })
    },

    deleteToCartshoe: (cartid, callback) => {
        const query = `DELETE FROM cart_shoe WHERE cartid = ?`;
        conn.query(query, [cartid], (err, result) => {
            if(err) return callback(err);
            callback(null, result);
        })
    }
}

module.exports = Cart