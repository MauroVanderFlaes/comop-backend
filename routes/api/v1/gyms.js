const express = require('express');
const router = express.Router();
const gymsController = require('../../../controllers/api/v1/gyms');

const auth = require('../../../middleware/auth');

// router.post('/', postGym)

router.get('/', auth.verifyApiKey, gymsController.getGyms);
router.post('/', auth.verifyApiKey, gymsController.postGyms);
router.post('/compareQrCode', auth.verifyApiKey, gymsController.compareQrCode);
router.get('/compareQrCode/:qrCode', auth.verifyApiKey, gymsController.getGymByQrCode);
// router.get('/compareQrCode', gymsController.getGymByQrCode)


module.exports = router
