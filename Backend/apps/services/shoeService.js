const Shoe = require("../models/shoe")
const BrandService = require("../services/brandService")
const CategoryService = require("../services/categoryService")

function getItemsAsync(startIndex, endIndex) {
    return new Promise((resolve, reject) => {
        Shoe.getItems(startIndex, endIndex, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

function getItemAsync(id) {
    return new Promise((resolve, reject) => {
        Shoe.getItemById(id, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function getNameAsync(id) {
    return new Promise((resolve, reject) => {
        BrandService.getName(id, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

async function getItems(startIndex, endIndex) {
    try {
        const shoes = await getItemsAsync(startIndex, endIndex);
        const itemsWithBrandNames = await Promise.all(shoes.map(async (shoe) => {
            const brandName = await getNameAsync(shoe.brandid);
            delete shoe.brandid;
            shoe.brandname = brandName[0].name;
            return shoe;
        }));
        return itemsWithBrandNames;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getItemById(id) {
    try {
        const shoe = await getItemAsync(id);
        const brandName = await getNameAsync(shoe[0].brandid);
        const category = await CategoryService.getCategoryName(id);
        delete shoe[0].brandid;
        shoe[0].brandname = brandName[0].name;
        shoe[0].category = category;
        // json to array
        shoe.forEach(item => {
            item.category = item.category.map(cat => cat.name);
        });
        return shoe;
    } catch (err) {
        console.log(err);
        throw new Error("Có lỗi xảy ra");
    }
}

async function addShoe(formData) {
    return new Promise((resolve, reject) => {
        Shoe.insertShoe(formData, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

async function updateShoe(formData) {
    return new Promise((resolve, reject) => {
        Shoe.updateShoe(formData, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function deleteShoe(id) {
    return new Promise((resolve, reject) => {
        Shoe.deleteShoe(id, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    getItems,
    getItemById,
    addShoe,
    updateShoe,
    deleteShoe,
}