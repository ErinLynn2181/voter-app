'use strict';

var express = require('express');
var controller = require('./poll.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:user_name/:poll_name', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
