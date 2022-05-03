
const { ObjectId } = require('mongodb');
const db = require('../DB/db');

exports.getUsers = async function (req, res) {
    const users = await db.getDB().collection("User").find().toArray();
    res.send(users);
}
exports.getUserById = async function (req, res) {
    const id = req.params.id;
    const user = await db.getDB().collection("User").findOne(ObjectId(id));
    res.send(user);
}
exports.addUser = async function (req, res) {
    if (req.body.email && req.body.password && req.body.name) {
        const user = req.body;
        const { name, email, password } = user;
        const doc = { email: email, password: password, name: name };
        const inserted = await db.getDB().collection("User").insertOne(doc);
        res.send(inserted);
    }
}
exports.deleteUserById = async function (req, res) {
    const id = req.params.id;
    const user = await db.getDB().collection("User").deleteOne({ _id: ObjectId(id) });
    res.send(user);
}
exports.updateUserById = async function (req, res) {
    const id = req.params.id;
    if (req.body.email && req.body.password && req.body.name) {
        const user = req.body;
        const { name, email, password } = user;
        const updated = await db.getDB().collection("User").updateOne({ _id: ObjectId(id) },
            {
                $set: {
                    name: name,
                    email: email,
                    password: password
                }
            });
        res.send(updated);
    }


}