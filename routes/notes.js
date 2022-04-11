const express = require('express');
const router = express.Router();
const notesCtrl = require('../controllers/notes');

router.post('/moods/notes', notesCtrl.create);
router.delete('/notes', notesCtrl.delete)

module.exports = router;