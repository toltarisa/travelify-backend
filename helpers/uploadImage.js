require('dotenv');
const util = require('util');
const gcs = require('../config/gcs');

const bucket = gcs.bucket(process.env.BUCKET_NAME);

function uploadImage(file) {
  return new Promise(function (resolve, reject) {
    const { originalname, buffer } = file;
    const blob = bucket.file(originalname.replace(/ /g, '_'));
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream
      .on('finish', function () {
        const publicUrl = util.format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
        );
        resolve(publicUrl);
      })
      .on('error', function () {
        reject('Unable to upload image to storage');
      })
      .end(buffer);
  });
}

module.exports = uploadImage;
