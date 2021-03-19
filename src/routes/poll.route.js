const express = require('express');
const router = express.Router();

const pollController = require('../controllers/poll.controller');

router.get('/', pollController.getAllPolls);
router.post('/', pollController.creatNewPoll);
router.put('/', pollController.increaseVotes);
router.delete('/', pollController.removePoll);

module.exports = router;