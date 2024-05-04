const db = require("../../config/database");
const conn = db.getConnection();

const Order = {
    addToOrderTable: (userid, total, callback) => {
        const query = `INSERT INTO \`order\` (total, userid) VALUES (?, ?)`;
        conn.query(query, [total, userid], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        })
    },

    addToOrderDetailTable: (orderid, item, callback) => {
        const query = `INSERT INTO order_detail (orderid, shoeid, quantity, price) VALUES (?, ?, ?, ?)`;
        conn.query(query, [orderid, item.id, item.quantity, item.price], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        })
    },

    getOrderById: (userid, callback) => {
        const query = `SELECT * FROM \`order\` WHERE userid = ?`;
        conn.query(query, [userid], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        })
    },

    getOrderDetailById: (orderid, callback) => {
        const query = `SELECT * FROM order_detail WHERE orderid = ?`;
        conn.query(query, [orderid], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        })
    },

    updateState: (orderid, status, callback) => {
        const query = `UPDATE \`order\` SET status = ? WHERE id = ?`;
        conn.query(query, [status, orderid], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        })
    }
}

module.exports = Order;