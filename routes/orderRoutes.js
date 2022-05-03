var express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');


router.get('/', orderController.getOrders)

router.post('/', orderController.addOrder);

router.delete('/:id', orderController.deleteOrderById)

router.put('/:id', orderController.updateOrderById);


module.exports = router;