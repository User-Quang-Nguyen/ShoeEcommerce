const User = require('../models/user')
const bcrypt = require('bcrypt');

function register(userData, callback) {
    User.register(userData, (err, result) => {
        if (!result || err) return callback(err);
        callback(null, result);
    });
}

async function login(formData, callback) {
    try {
        User.findOne(formData.email, async (err, user) => {
            if (err) {
                return callback(err);
            }
            if (user.length === 0) {
                return callback(new Error("Người dùng không tồn tại"));
            }
            try {
                const isPasswordValid = await bcrypt.compare(formData.password, user[0].password);
                if (!isPasswordValid) {
                    return callback(new Error("Mật khẩu không chính xác"));
                }
                const result = {
                    "id": user[0].id,
                    "name": user[0].name,
                    "role": user[0].role
                };
                callback(null, result);
            } catch (bcryptErr) {
                callback(bcryptErr);
            }
        });
    } catch (err) {
        callback(err);
    }
}

module.exports = {
    register: register,
    login: login,
}