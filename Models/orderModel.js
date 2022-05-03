const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderItemSchema = new Schema({
	prud_id: {
		type: Schema.Types.ObjectId,
		ref: 'Product'
	},
	quntity: Number
})
const orderSchema = new Schema({
	'order_date': Date,
	'order_sum': Number,
	'user_id': {
		type: Schema.Types.ObjectId,
	ref: 'User'
	},
	'products': {
		type: [orderItemSchema]
	},
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema);
