const express = require('express')
const router = express.Router()
const gymsController = require('../../../controllers/api/v1/gyms')

// router.post('/', postGym)

router.get('/', gymsController.getGyms);
router.post('/', gymsController.postGyms);
router.post('/compareQrCode', gymsController.compareQrCode);
router.get('/compareQrCode/:qrCode', gymsController.getGymByQrCode);
// router.get('/compareQrCode', gymsController.getGymByQrCode)


module.exports = router
