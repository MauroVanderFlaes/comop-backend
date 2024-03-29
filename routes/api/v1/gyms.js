const express = require('express')
const router = express.Router()
const gymsController = require('../../../controllers/api/v1/gyms')

// router.post('/', postGym)

router.get('/', gymsController.getGyms);
router.post('/', gymsController.postGyms);
router.post('/compareQrCode', gymsController.compareQrCode);

module.exports = router
