const Router = require('express');

const createRequest = require('../service/requestService');

const router = Router();

router.post('/requests', createRequest);

module.exports = router;
