const ShoeService = require("../services/shoeService");

async function getItems(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 10;
        const startIndex = 1 + pageSize * (page - 1);
        const endIndex = startIndex + pageSize - 1;

        const result = await ShoeService.getItems(startIndex, endIndex);
        if (!result.length) {
            return res.status(204).json({ message: "Không có dữ liệu" });
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Có lỗi xảy ra" });
    }
}

async function getItemById(req, res) {
    try {
        const id = req.params.id;
        const result = await ShoeService.getItemById(id);
        if (!result.length) {
            return res.status(204).json({ message: "Không có dữ liệu" });
        }
        return res.status(200).json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Có lỗi xảy ra" });
    }
}

async function addShoe(req, res) {
    try {
        const formData = req.body;
        await ShoeService.addShoe(formData);
        return res.status(200).json({ message: "Thêm sản phẩm thành công", state: true })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Có lỗi xảy ra" });
    }
}

async function updateShoe(req, res) {
    try {
        const formData = req.body;
        await ShoeService.updateShoe(formData);
        return res.status(200).json({ message: "Cập nhật thành công", state: true })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Có lỗi xảy ra" });
    }
}

async function deleteShoe(req, res) {
    try {
        const id = req.query.id;
        await ShoeService.deleteShoe(id);
        return res.status(200).json({ message: "Xóa thành công", state: true })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Không thể xóa" });
    }
}

module.exports = {
    getItems,
    getItemById,
    addShoe,
    updateShoe,
    deleteShoe,
}