const User = require("../models/user")

function getUserById(id) {
    return new Promise((resolve, reject) => {
        User.findById(id, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function updateInfor(userid, formData) {
    return new Promise((resolve, reject) => {
        User.updateInfor(userid, formData, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    getUserById,
    updateInfor,
}