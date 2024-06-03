const UserService = require("../services/userService");
const User = require("../models/user");

const findOne = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne(email, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const checkBanner = async (req, res, next) => {
    const email = req.body.email
    const user = await findOne(email);
    if (user.isdeleted == false) {
        next();
    } else {
        return res.status(403).json({ message: "Tài khoản đã bị xóa!", state: false });
    }
}

module.exports = {
    checkBanner,
}