const Brand = require("../models/brand");

function getName(id, callback) {
    Brand.getName(id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    })
}

module.exports = {
    getName: getName,
}