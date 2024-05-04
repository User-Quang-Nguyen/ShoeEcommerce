const db = require("../../config/database");
const conn = db.getConnection();

const Brand = {
    getName: (id, callback) => {
        const query = `SELECT name FROM brand WHERE id = ?;`;
        conn.query(query, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        })
    }
}

module.exports = Brand;