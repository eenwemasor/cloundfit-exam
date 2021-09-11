const express = require('express');

const categoryController = require('../controllers/category.controller')


const router = express.Router();

router.get('/', categoryController.index);
router.post('/create', categoryController.save);
router.put('/update/:id', categoryController.update);
router.delete('/destroy/:id', categoryController.destroy);


 module.exports = router;