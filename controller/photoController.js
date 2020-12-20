const Photo = require('../model/Photo');
const Location = require('../model/Location');
require('dotenv').config();
const uploadImage = require('../helpers/uploadImage');

async function addPhoto(req, res) {
  try {
    const { file } = req;
    const { locationId } = req.params;
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      const image = await Photo.create({ imageUrl: imageUrl });

      await Location.findByIdAndUpdate(
        locationId,
        {
          $push: {
            photos: {
              _id: image._id,
            },
          },
        },
        { new: true, useFindAndModify: false },
      );
    }

    res.status(200).json({ message: 'Image uploaded to storage successfully' });
  } catch (error) {
    res.json({ message: error.message });
  }
}

async function getPhotoById(req, res) {
  const photoId = req.params.photoId;
  try {
    const photo = await Photo.find({ _id: photoId });
    res.status(200).json({ photo: photo[0] });
  } catch (error) {
    res.json({ message: error.message });
  }
}

async function getAllPhotosOfLocation(req, res) {
  const locationId = req.params.locationId;

  try {
    const response = await Location.find({ _id: locationId }, 'photos');
    const photos = await Photo.find({
      _id: {
        $in: response[0].photos,
      },
    });
    res.status(200).json({ photos });
  } catch (error) {
    res.json({ message: error.message });
  }
}

exports.photo = { addPhoto, getPhotoById, getAllPhotosOfLocation };
