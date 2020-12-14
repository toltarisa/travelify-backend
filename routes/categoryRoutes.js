const Router = require('express');
const requireAuth = require('../middleware/authMiddleware');
const categoryController = require('../controller/categoryController');
const router = Router();

router.post('/', requireAuth, categoryController.createCategory);
router.get('/', requireAuth, categoryController.listAllCategories);
router.get('/:categoryId', requireAuth, categoryController.getCategoryById);
router.delete('/:categoryId', requireAuth, categoryController.deleteCategory);

module.exports = router;
