const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const match = require('nodemon/lib/monitor/match');
var Schema = mongoose.Schema;
const { isEmail } = require('validator');
const adressSchema = new mongoose.Schema({
    street: String,
    city: String,
    country: String
})
const nDate = new Date().toLocaleString('en-IL', {
    timeZone: 'Israel'
});

const userSchema = new Schema({
    first_name: {
        type: String,
        minlength: 3
    },
    last_name: {
        type: String,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 11,
        validate: [isEmail, 'email is not valid 😡']
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    last_visit: {
        type: Date,
        default: new Date()
    },
    adresses: [adressSchema]
},
    { timestamps: true, 'toJSON': { virtuals: true } });

userSchema.virtual('orders', {
    ref: 'order',
    localField: '_id',
    foreignField: 'user_id'
});


module.exports = mongoose.model('User', userSchema);