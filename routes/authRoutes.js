const Router = require('express');

const { authService } = require('../service/authService');
const { login, signup, logout, reset, forgotPassword } = authService;

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset', reset);

router.get('/logout', logout);

module.exports = router;
