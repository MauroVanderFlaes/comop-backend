const express = require('express')
const router = express.Router()
const gymsController = require('../../../controllers/api/v1/gyms')

// router.post('/', postGym)

router.get('/', gymsController.getGyms);
router.post('/', gymsController.postGyms);

module.exports = router
