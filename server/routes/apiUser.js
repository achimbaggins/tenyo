var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const authority = require('../helpers/authority');


/* GET users listing. */
router.get('/', authority, userController.findAll);
router.post('/', authority, userController.createData)
router.get('/:id', authority, userController.findById)
router.put('/:id', authority, userController.put)
router.delete('/:id', authority, userController.destroy)


module.exports = router;
