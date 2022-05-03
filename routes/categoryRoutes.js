var express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');


router.post('/', categoryController.addCategories);

router.get('/', categoryController.getCategories);

router.put('/:id', categoryController.updateCategoryById)

module.exports = router;