const Photo = require('../model/Photo');
const { Storage } = require('@google-cloud/storage');
const mime = require('mime-types');
const uuid = require('uuidv4');
require('dotenv').config();
var serviceAccount = require('../service-account.json');

const storage = new Storage({
  projectId: 'travelify-storage',
  keyFilename: serviceAccount,
});

const bucket = storage.bucket('gs://travelify-storage.appspot.com');

async function addPhoto(req, res) {
  const type = mime.lookup(req.file.originalName);

  const blob = bucket.file();
}

function listAllPhotos(req, res) {
  return null;
}

exports.photo = { addPhoto, listAllPhotos };
