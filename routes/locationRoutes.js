const Router = require('express');

const { locationService } = require('../service/locationService');
const requireAuth = require('../middleware/authMiddleware');
const permit = require('../helpers/authorization');
const { categoryService } = require('../service/categoryService');
const { addCategoryToLocation } = categoryService;

const router = Router();

const {
  createLocation,
  deleteLocation,
  getLocationById,
  listAllLocations,
  searchLocationByQuery,
  updateLocation,
} = locationService;

router.post('/', [requireAuth, permit('admin')], createLocation);
router.post(
  '/:locationId/categories/:categoryId',
  requireAuth,
  addCategoryToLocation,
);

router.get('/search', requireAuth, searchLocationByQuery);
router.get('/', requireAuth, listAllLocations);
router.get('/:locationId', requireAuth, getLocationById);

router.put('/:locationId', [requireAuth, permit('admin')], updateLocation);
router.delete('/:locationId', [requireAuth, permit('admin')], deleteLocation);

module.exports = router;
