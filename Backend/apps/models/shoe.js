const db = require('../../config/database')
const conn = db.getConnection()

const Shoe = {
    getItems: (start, end, callback) => {
        const query = `SELECT * FROM shoe WHERE id BETWEEN ? and ?`;
        conn.query(query, [start, end], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        })
    },

    getItemById: (id, callback) => {
        const query = `SELECT * FROM shoe WHERE id = ?`;
        conn.query(query, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        })
    },

    updateQuantity: (quantity, id, callback) => {
        const query = `UPDATE shoe SET quantity = ? WHERE id = ?`;
        conn.query(query, [quantity, id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        })
    },

    insertShoe: (formData, callback) => {
        const query = `INSERT INTO shoe (name, description, price, quantity, image, color, size, brandid) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        conn.query(query, [formData.name, formData.description, formData.price, formData.quantity, formData.image, formData.color, formData.size, formData.brandid], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        })
    },

    updateShoe: (formData, callback) => {
        const { id, price, quantity, color, size } = formData;
        const query = `UPDATE shoe SET price = ?, quantity = ?, color = ?, size = ? WHERE id = ?`;
        conn.query(query, [price, quantity, color, size, id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        })
    },

    deleteShoe: (id, callback) => {
        const query = `DELETE FROM shoe WHERE id = ?`;
        conn.query(query, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        })
    },
}

module.exports = Shoe;