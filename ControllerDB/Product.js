
const { ObjectId } = require('mongodb');
const db = require('../DB/db');

exports. = async function (req, res) {
    const products = await db.getDB().collection("Product").find().toArray();
    res.send(products);
}
exports.getProductById = async function (req, res) {
    const id = req.params.id;
    const product = await db.getDB().collection("Product").findOne(ObjectId(id));
    res.send(product);
}
exports.addProduct = async function (req, res) {
    if (req.body.price && req.body.desc && req.body.name) {
        const product = req.body;
        const { name, desc, price } = product;
        const doc = { name: name, desc: desc, price: price };
        const inserted = await db.getDB().collection("Product").insertOne(doc);
        res.send(inserted);
    }
}
exports.deleteProductById = async function (req, res) {
    const id = req.params.id;
    const product = await db.getDB().collection("Product").deleteOne({ _id: ObjectId(id) });
    res.send(product);
}
exports.updateProductById = async function (req, res) {
    const id = req.params.id;
    if (req.body.price && req.body.desc && req.body.name) {
        const product = req.body;
        const { name, desc, price } = product;
        const updated = await db.getDB().collection("Product").updateOne({ _id: ObjectId(id) },
            {
                $set: {
                    name: name,
                    desc: desc,
                    price: price
                }
            });
        res.send(updated);
    }


}