const express = require('express');
const router = express.Router();
const notesCtrl = require('../controllers/notes');

router.get('/:id/notes', notesCtrl.new);
router.post('/:id/notes', notesCtrl.create); //location where we are posting this data
router.delete('/:id/notes', notesCtrl.delete)
router.put('/:id/notes', notesCtrl.update);
module.exports = router;