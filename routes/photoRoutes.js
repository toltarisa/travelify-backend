const Router = require('express');
const { photo } = require('../controller/photoController');
const multer = require('../middleware/multerMiddleware');
const router = Router();

const { addPhoto, listAllPhotos } = photo;

router.post('/:locationId/photos', multer.single('file'), addPhoto);
router.get('/:locationId/photos', listAllPhotos);

module.exports = router;
