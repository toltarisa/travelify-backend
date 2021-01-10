const Location = require('../model/Location');

async function createLocation(req, res) {
  const { name, lat, long, country, description } = req.body;

  try {
    await Location.create({ name, lat, long, country, description });

    res.status(201).json({
      message: `location is created successfully`,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: `Cannot create location please check request object` });
  }
}

async function listAllLocations(req, res) {
  try {
    const locations = await Location.find({});
    res.json(locations);
  } catch (error) {
    res.status(404).json({ error: `There isn't any location exists!` });
  }
}

async function searchLocationByQuery(req, res) {
  const name = req.query.name;
  try {
    const locations = await Location.find({ name: { $regex: name } });
    res.status(200).json(locations);
  } catch (error) {
    res.status(404).json({
      error: `There isn't any location that matches with name :${name}`,
    });
  }
}

async function getLocationById(req, res) {
  const locationId = req.params.locationId;

  try {
    const location = await Location.find({ _id: locationId });
    res.json(location);
  } catch (error) {
    res.status(404);
    res.send({ error: `Location with id:${locationId} doesn't exist!` });
  }
}

async function updateLocation(req, res) {
  if (!req.body) {
    return res.status(400).json({
      message: 'request payload cannot be empty for update operation',
    });
  }

  const locationId = req.params.locationId;
  const newData = req.body;

  try {
    const response = await Location.findByIdAndUpdate(locationId, newData, {
      useFindAndModify: false,
    });

    if (response)
      res.status(200).json({ message: 'Location updated successfully' });
    else {
      res
        .status(404)
        .json({ message: `Cannot find a Location with id: ${locationId}` });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

async function deleteLocation(req, res) {
  const locationId = req.params.locationId;
  try {
    await Location.deleteOne({ _id: locationId });
    res.status(204).json();
  } catch {
    res.status(404);
    res.send({ error: "Location doesn't exist!" });
  }
}

exports.locationService = {
  createLocation,
  listAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
  searchLocationByQuery,
};
