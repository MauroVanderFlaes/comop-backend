const express = require('express')
const router = express.Router()
const gymfeedController = require('../../../controllers/api/v1/gymfeed')

router.get('/', gymfeedController.getGymfeed)
router.post('/', gymfeedController.postGymfeed)
// get completed challenges by user id
router.get('/:userId', gymfeedController.getCompletedChallengesByUserId)
router.post('/:id/accept', gymfeedController.acceptGymfeed)
router.post('/:id/reject', gymfeedController.rejectGymfeed)


module.exports = router