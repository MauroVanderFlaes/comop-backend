const express = require('express');
const router = express.Router();
const challengesController = require('../../../controllers/api/v1/challenges');

const auth = require('../../../middleware/auth');

router.post('/', auth.verifyApiKey, challengesController.createChallenges);
router.get('/', auth.verifyApiKey, challengesController.getChallenges);
router.put('/:id', auth.verifyApiKey, challengesController.updateChallenges);
router.put('/active/:id', auth.verifyApiKey, challengesController.toggleActive);
router.get('/active', auth.verifyApiKey, challengesController.getActiveChallenges);

module.exports = router;
