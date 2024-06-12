const express = require('express')
const router = express.Router()
const gymfeedController = require('../../../controllers/api/v1/gymfeed')

router.get('/', gymfeedController.getGymfeed)
router.post('/', gymfeedController.postGymfeed)


module.exports = router