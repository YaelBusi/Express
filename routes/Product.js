const express = require('express');
const router = express.Router();
const product = require('../controllers/Product')

router.get('/byCategory', product.getProductByCategoryId)

router.get('/', product.getProducts)

// router.get('/:id', product.getProductByCategoryId)

router.post('/', product.addProduct)

router.delete('/:id', product.deleteProductById)

router.put('/:id', product.updateProductById)

module.exports = router;