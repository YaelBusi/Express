var CategoryModel = require('../Models/categoryModel');
const { ObjectId } = require('mongodb');

exports.addCategories = async function (req, res, next) {
    try {
        let newCategory = new CategoryModel(req.body);
        let saved = await newCategory.save();
        res.send(saved);
    }
    catch (error) {
        next(error);
    }
}

exports.getCategories = async function (req, res, next) {
    try {
        const categories = await CategoryModel.find();
        res.json(categories);
    }
    catch (error) {
        next(error);
    }
}
exports.updateCategoryById = async function (req, res, next) {
    try {
        const id = req.params.id;
        const category = req.body;
        const { category_name } = category;
        const categoryToUpdate = {
            category_name: category_name
        }
        const updated = await CategoryModel.findByIdAndUpdate(id, categoryToUpdate, { new: true });
        res.send(updated);
    }
    catch (error) {
        next(error);
    }
}
exports.deleteCategoryById = async function (req, res, next) {
    try {
        const id = req.params.id;
        const category = await CategoryModel.deleteOne({ _id: ObjectId(id) });
        res.send(category);
    }
    catch (error) {
        next(error);
    }

}

