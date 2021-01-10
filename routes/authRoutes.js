const Router = require('express');
const authController = require('../controller/authController');

const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset/:token', authController.reset);

module.exports = router;
