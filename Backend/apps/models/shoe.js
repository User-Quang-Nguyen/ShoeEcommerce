const db = require('../../config/database')
const conn = db.getConnection()
const databaseUtils = require("../utils/database")

const Shoe = {
    getItems: (start, end, callback) => {
        const query = `SELECT * FROM "shoe" WHERE "id" BETWEEN $1 and $2`;
        const values = [start, end];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    getItemById: (id, callback) => {
        const query = `SELECT * FROM "shoe" WHERE "id" = $1`;
        const values = [id];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    updateQuantity: (quantity, id, callback) => {
        const query = `UPDATE "shoe" SET "quantity" = $1 WHERE "id" = $2`;
        const values = [quantity, id];
        databaseUtils.update_uti(conn, callback, query, values);
    },

    insertShoe: (formData, callback) => {
        const query = `INSERT INTO "shoe" (name, description, price, quantity, image, color, size, brandid) 
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
        const values = [formData.name, formData.description, formData.price, formData.quantity, formData.image, formData.color, formData.size, formData.brandid];
        databaseUtils.insert_uti(conn, callback, query, values);
    },

    updateShoe: (formData, callback) => {
        const { id, price, quantity, color, size } = formData;
        const query = `UPDATE "shoe" SET "price" = $1, "quantity" = $2, "color" = $3, "size" = $4 WHERE "id" = $5`;
        const values = [price, quantity, color, size, id]
        databaseUtils.update_uti(conn, callback, query, values);
    },

    deleteShoe: (id, callback) => {
        const query = `DELETE FROM "shoe" WHERE "id" = $1`;
        const values = [id];
        databaseUtils.delete_uti(conn, callback, query, values);
    },
}

module.exports = Shoe;