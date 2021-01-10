const Router = require('express');

const requireAuth = require('../middleware/authMiddleware');
const { categoryService } = require('../service/categoryService');

const {
  createCategory,
  deleteCategory,
  getCategoryById,
  listAllCategories,
  listLocationsByCategory,
} = categoryService;

const router = Router();

router.post('/', requireAuth, createCategory);

router.get('/', requireAuth, listAllCategories);
router.get('/:categoryId', requireAuth, getCategoryById);
router.get('/:categoryId/locations', requireAuth, listLocationsByCategory);

router.delete('/:categoryId', requireAuth, deleteCategory);

module.exports = router;
