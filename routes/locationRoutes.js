const Router = require('express');

const { locationController } = require('../controller/locationController');

const requireAuth = require('../middleware/authMiddleware');
const permit = require('../helpers/authorization');
const categoryController = require('../controller/categoryController');

const router = Router();

const {
  createLocation,
  deleteLocation,
  getLocationById,
  listAllLocations,
  searchLocationByQuery,
  updateLocation,
} = locationController;
router.post('/', [requireAuth, permit('admin')], createLocation);
router.post(
  '/:locationId/categories/:categoryId',
  requireAuth,
  categoryController.addCategoryToLocation,
);
router.get('/search', requireAuth, searchLocationByQuery);
router.get('/', requireAuth, listAllLocations);
router.get('/:locationId', requireAuth, getLocationById);

router.put('/:locationId', [requireAuth, permit('admin')], updateLocation);
router.delete('/:locationId', [requireAuth, permit('admin')], deleteLocation);

module.exports = router;
