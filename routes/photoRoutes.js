const Router = require('express');
const { photo } = require('../controller/photoController');
const multer = require('../middleware/multerMiddleware');
const router = Router();

const { addPhoto, getPhotoById, getAllPhotosOfLocation } = photo;

router.post('/:locationId/photos', multer.single('file'), addPhoto);
router.get('/:locationId/photos/:photoId', getPhotoById);
router.get('/:locationId/photos', getAllPhotosOfLocation);

module.exports = router;
