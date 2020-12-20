const { Storage } = require('@google-cloud/storage');
const path = require('path');
require('dotenv');
const serviceKey = path.join(__dirname, '../keys.json');

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: serviceKey,
});

module.exports = storage;
