var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	'category_name': String
},{timestamps: true});

module.exports = mongoose.model('category', categorySchema);
