const Router = require('express');

const { photoService } = require('../service/photoService');
const multer = require('../middleware/multerMiddleware');
const router = Router();

const { addPhoto, getPhotoById, getAllPhotosOfLocation } = photoService;

router.post('/:locationId/photos', multer.single('file'), addPhoto);

router.get('/:locationId/photos/:photoId', getPhotoById);
router.get('/:locationId/photos', getAllPhotosOfLocation);

module.exports = router;
