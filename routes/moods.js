const express = require('express');
const router = express.Router();
const moodsCtrl = require('../controllers/moods');

router.get('/', moodsCtrl.index);

module.exports = router;