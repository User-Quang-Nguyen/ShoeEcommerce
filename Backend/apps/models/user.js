const db = require('../../config/database');
const conn = db.getConnection()
const hash = require('../utils/hashPassword')

const User = {
    register: (user, callback) => {
        hash.hashPassword(user.password)
            .then(result => {
                user.password = result;
                const query = `INSERT INTO user SET ?`;
                conn.query(query, user, (err, result) => {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, result);
                });
            })
            .catch(err => {
                return callback(err);
            })
    },

    findOne: (email, callback) => {
        const query = `SELECT * FROM user WHERE email = ?`;
        conn.query(query, email, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        })
    },

    findById: (userid, callback) => {
        const query = `SELECT id, name, email, phonenumber, address, gender, role FROM user WHERE id = ?`;
        conn.query(query, [userid], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        })
    },

    updateInfor: (userid, formData, callback) => {
        const query = `UPDATE user SET name = ?, email = ?, phonenumber = ?, address = ?, gender = ? WHERE id = ?`;
        conn.query(query, [formData.name, formData.email, formData.phonenumber, formData.address, formData.gender, userid], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        })
    },
}

module.exports = User