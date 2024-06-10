const express = require('express');
const router = express.Router();
const challengesController = require('../../../controllers/api/v1/challenges');

router.post('/', challengesController.createChallenges);
router.get('/', challengesController.getChallenges);
router.put('/:id', challengesController.updateChallenges);
router.put('/active/:id', challengesController.toggleActive);
router.get('/active', challengesController.getActiveChallenges);

module.exports = router;
