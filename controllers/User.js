const { ObjectId } = require('mongodb');
const userModel = require('../Models/User');
const validator = require('validate');
const logger = require('../logs/logger');
const { error } = require('../logs/logger');

exports.getUsers = async function (req, res, next) {
    try {
        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Israel'
        });

        console.log(nDate);
        //logger.error('oh no! 🤔😪');
        //throw new error('failed');
        const users = await userModel.find();
        res.send(users);
    }
    catch (error) {
        next(error);
    }

}
exports.getUserByEmailAndPassword = async function (req, res, next) {
    try {
        const email = req.params.email;
        const password = req.params.password;
        const user = await userModel.findOne({ email: email, password: password });
        if (user) {
            res.send(user);
        }
        else {
            throw new error("user is undefined 😤");
        }
    }
    catch (error) {
        next(error);
    }
}
exports.getUserById = async function (req, res, next) {
    try {
        const id = req.params.id;
        const user = await userModel.findById({ _id: ObjectId(id) }).populate({ path: 'orders', populate: { path: 'products.prud_id' } });
        res.send(user);
    }
    catch (error) {
        next(error);
    }
}
exports.addUser = async function (req, res, next) {
    try {
        const user = new userModel(req.body);
        const inserted = await user.save();
        res.send(inserted);
    }
    catch (error) {
        next(error);
    }
}
exports.deleteUserById = async function (req, res) {
    try {
        const id = req.params.id;
        const user = await userModel.deleteOne({ _id: ObjectId(id) });
        res.send(user);
    }
    catch (error) {
        console.log(`ERROR is : ${error}`);
    }

}
exports.updateUserById = async function (req, res, next) {
    console.log("in update");
    try {
        const id = req.params.id;
        const user = req.body;
        const { first_name, last_name, email, password, adresses, group } = user;
        const userToUpdate = {
            first_name: first_name,
            last_name: last_name,
            last_visit: new Date(),
            email: email,
            password: password,
            adresses: adresses,
            group: group
        }
        const updated = await userModel.findByIdAndUpdate(id, userToUpdate, { new: true });
        res.send(updated);
    }
    catch (error) {
        next(error);
    }
}