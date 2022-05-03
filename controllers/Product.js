const productModel = require('../Models/Product');
const { ObjectId } = require("mongodb");
exports.getProducts = async function (req, res, next) {
    try {
        const products = await productModel.find().populate('category_id');
        res.send(products);
    }
    catch (error) {
        next(error);
    }
}
exports.getProductByCategoryId = async function (req, res, next) {
    try {
        const categories = req.query.categoryId;
        const products = await productModel.find({ category_id: categories })//.populate('category');
        res.send(products);
    }
    catch (error) {
        next(error);
    }
}
exports.addProduct = async function (req, res, next) {
    try {
        const product = new productModel(req.body);
        const inserted = await product.save();
        res.send(inserted);
    }
    catch (error) {
        next(error);
    }
}
exports.deleteProductById = async function (req, res, next) {
    try {
        const id = req.params.id;
        const product = await productModel.deleteOne({ _id: ObjectId(id) });
        res.send(product);
    }
    catch (error) {
        next(error);
    }

}
exports.updateProductById = async function (req, res, next) {
    try {
        const id = req.params.id;
        const product = req.body;
        const { prud_name, desc, price, image, category_id } = product;
        const productToUpdate = {
            prud_name: prud_name,
            desc: desc,
            price: price,
            image: image,
            category_id: category_id
        }
        const updated = await productModel.findByIdAndUpdate(id, productToUpdate, { new: true });
        res.send(updated);
    }
    catch (error) {
        next(error);
    }
}

