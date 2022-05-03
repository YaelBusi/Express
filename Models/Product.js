const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    prud_name: {
        type: String,
    },
    desc: {
        type: String,
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }
});
module.exports = mongoose.model('Product', productSchema);
