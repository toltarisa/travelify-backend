const Router = require('express');

const createRequest = require('../controller/requestController');

const router = Router();

router.post('/requests', createRequest);

module.exports = router;
