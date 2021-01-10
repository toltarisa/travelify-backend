const Router = require('express');

const { authController } = require('../controller/authController');
const { login, signup, logout, reset, forgotPassword } = authController;

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset/:token', reset);

router.get('/logout', logout);

module.exports = router;
