const db = require("../../config/database")
const conn = db.getConnection()

const Category = {
    getCategoryByShoeId: (shoeid, callback) => {
        const query = `SELECT categoryid FROM category_shoe WHERE shoeid = ?`;
        conn.query(query, [shoeid], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        })
    },

    getCategoryName: (id, callback) => {
        const query = `SELECT name FROM category WHERE id = ?`;
        conn.query(query, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        })
    }
}

module.exports = Category;