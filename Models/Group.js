const mongoose = require('mongoose');
const groupSchema = new mongoose.Schema({
    desc: {
        type: String,
    }
},{timestamps: true});
module.exports = mongoose.model('Group', groupSchema);