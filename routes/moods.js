const express = require('express');
const router = express.Router();
const moodsCtrl = require('../controllers/moods');

router.get('/moods', moodsCtrl.new);
router.post('/', moodsCtrl.create);
router.get('/:id/mood', moodsCtrl.edit);
router.put('/mood/:id', moodsCtrl.update);
module.exports = router;