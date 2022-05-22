var OrderModel = require('../Models/orderModel');
const { ObjectId } = require('mongodb');
const moment = require('moment');

exports.getOrders = async function (req, res, next) {
    try {
        const orders = await OrderModel.find().populate('user_id').populate({ path: 'products.prud_id' });
        res.send(orders);
    }
    catch (error) {
        next(error);
    }
}
exports.getOrders = async function (req, res, next) {
    try {

        function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
          }
          
          function formatDate(date) {
            return [
                padTo2Digits( date.getFullYear()),
              padTo2Digits(date.getMonth() ),
            (  date.getDay()-1),

            ].join('-');
          }
        const date11=formatDate(new Date());

         const e = moment(new Date()).utcOffset('-21:00').format("YYYY-MM-DD"); //req.params.startTime = 2016-09-25 00:00:00
        // //const tmp = date + "01:00:10";
        // const endDate = moment(date).utcOffset('-20:00').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00
        const orders = await OrderModel.find({
           order_date:new Date()}
        ).populate('user_id').populate({ path: 'products.prud_id' });
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