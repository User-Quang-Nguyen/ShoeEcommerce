
const updateQuantity = (req, res, next) => {
    const formData = req.body;
    if (!formData.hasOwnProperty('cartshoeid') || !formData.hasOwnProperty('quantity')) {
        return res.status(400).json({ message: "Trường thông tin không được truyền vào", state: false })

    }
    if (Object.keys(formData).length === 0) {
        return res.status(400).json({ message: "Thiếu trường thông tin", state: false })
    }

    next();
}

const addToCart = (req, res, next) => {
    const formData = req.body;
    if (!formData.hasOwnProperty('shoeid') || !formData.hasOwnProperty('quantity')) {
        return res.status(400).json({ message: "Trường thông tin không được truyền vào", state: false })

    }
    if (Object.keys(formData).length === 0) {
        return res.status(400).json({ message: "Thiếu trường thông tin", state: false })
    }
    next();
}

const addShoe = (req, res, next) => {
    const { name, description, price, quantity, size } = req.body;
    if (!name || !description || !price || !quantity || !size) {
        return res.status(400).json({ message: "Thiếu thông tin", state: false })
    }

    if (isNaN(price) || isNaN(quantity) || isNaN(size)) {
        return res.status(400).json({ message: "Giá, số lượng, size phải là số", state: false })
    }

    next();
}

const updateShoe = (req, res, next) => {
    const { id, price, quantity, color, size } = req.body;
    if (!id || !price || !quantity || !color || !size) {
        return res.status(400).json({ message: "Không để trống thông tin", state: false })
    }

    if (isNaN(id) || isNaN(price) || isNaN(quantity) || isNaN(size)) {
        return res.status(400).json({ message: "Các trường là số", state: true })
    }

    next();
}

const updateStateOrder = (req, res, next) => {
    const formData = req.body;
    // 1 oke, 2 cancel
    if (formData.state == 1 || formData.state == 2) {
        next();
    } else {
        return res.status(400).json({ message: "Trạng thái không hợp lệ", state: false });
    }
}

module.exports = {
    updateQuantity,
    addToCart,
    addShoe,
    updateShoe,
    updateStateOrder,
}