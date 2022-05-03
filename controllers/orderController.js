var OrderModel = require('../Models/orderModel');
const { ObjectId } = require('mongodb');

exports.getOrders = async function (req, res, next) {
    try {
        const orders = await OrderModel.find().populate('user_id').populate({ path: 'products.prud_id' });
        res.send(orders);
    }
    catch (error) {
        next(error);
    }
}
exports.addOrder = async function (req, res, next) {
    try {
        const order = new OrderModel(req.body);
        const inserted = await order.save();
        res.send(inserted);
    }
    catch (error) {
        next(error);
    }
}
exports.deleteOrderById = async function (req, res, next) {
    try {
        const id = req.params.id;
        const order = await OrderModel.deleteOne({ _id: ObjectId(id) });
        res.send(order);
    }
    catch (error) {
        next(error);
    }

}
exports.updateOrderById = async function (req, res, next) {
    console.log("in update");
    try {
        const id = req.params.id;
        const order = req.body;
        const { order_date, order_sum, user_id, products } = order;
        const userToUpdate = {
            order_date: order_date,
            order_sum: order_sum,
            user_id: user_id,
            products: products
        }
        const updated = await OrderModel.findByIdAndUpdate(id, userToUpdate, { new: true });
        res.send(updated);
    }
    catch (error) {
        next(error);
    }
}
exports.addOrder = async function (req, res, next) {
    try {
        const order = new OrderModel(req.body);
        const inserted = await order.save();
        res.send(inserted);
    }
    catch (error) {
        next(error);
    }
}