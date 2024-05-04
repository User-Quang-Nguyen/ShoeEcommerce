const express = require('express');
const router = express.Router();
const UserController = require('../controllers/authController');
const ValidationInput = require('../middlewares/validation')

router.post('/register', ValidationInput.validateRegisterInput, UserController.registerUser);
router.post('/login', ValidationInput.validateLoginInput, UserController.login);

module.exports = router;