const Router = require('express');

const requireAuth = require('../middleware/authMiddleware');
const { categoryController } = require('../controller/categoryController');

const {
  createCategory,
  deleteCategory,
  getCategoryById,
  listAllCategories,
  listLocationsByCategory,
} = categoryController;

const router = Router();

router.post('/', requireAuth, createCategory);

router.get('/', requireAuth, listAllCategories);
router.get('/:categoryId', requireAuth, getCategoryById);
router.get('/:categoryId/locations', requireAuth, listLocationsByCategory);

router.delete('/:categoryId', requireAuth, deleteCategory);

module.exports = router;
