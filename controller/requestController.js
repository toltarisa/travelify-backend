const CreateRequest = require('../model/CreateRequest');
const DeleteRequest = require('../model/DeleteRequest');

async function createRequest(req, res) {
  let request = req.body;
  const type = req.query.type;

  if (type === 'create') {
    try {
      await CreateRequest.create(request);
      res
        .status(201)
        .json({ message: 'create request for new location created' });
    } catch (error) {
      res.status(400).json({
        error: `Cannot create request please check request object`,
      });
    }
  } else if (type === 'update') {
    try {
      await CreateRequest.create(request);
      res.status(201).json({
        message: `update request for location with id:${request.locationId} created`,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  } else {
    try {
      await DeleteRequest.create(request);
      res.status(201).json({ message: 'Delete request created successfully' });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }
}

module.exports = createRequest;
