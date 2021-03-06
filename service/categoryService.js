const Category = require('../model/Category');
const Location = require('../model/Location');

async function createCategory(req, res) {
  const category = new Category({
    categoryName: req.body.categoryName,
    icon: req.body.icon,
    color: req.body.color,
  });

  try {
    await Category.create(category);
    res.status(201).json({
      message: `category with id:${category._id} is created successfully`,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: `Cannot create category please check request object` });
  }
}

async function addCategoryToLocation(req, res) {
  const locationId = req.params.locationId;
  const categoryId = req.params.categoryId;

  try {
    const category = await Category.findOne({ _id: categoryId });

    await Location.findByIdAndUpdate(
      locationId,
      { category: category },
      { new: true, useFindAndModify: false },
    );
    res.status(200).json({ message: 'Location category setted succesfully' });
  } catch (error) {
    res.json({ error });
  }
}

async function listAllCategories(req, res) {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(404).json({ error: `There isn't any category exists!` });
  }
}

async function getCategoryById(req, res) {
  const categoryId = req.params.categoryId;

  try {
    const category = await Category.find({ _id: categoryId });
    res.json(category);
  } catch (error) {
    res.status(404);
    res.send({ error: `Category with id:${categoryId} doesn't exist!` });
  }
}

async function deleteCategory(req, res) {
  const categoryId = req.params.categoryId;
  try {
    await Category.deleteOne({ _id: categoryId });
    res.status(204).json();
  } catch {
    res.status(404);
    res.send({ error: "Category doesn't exist!" });
  }
}

async function listLocationsByCategory(req, res) {
  const categoryId = req.params.categoryId;

  try {
    const category = await Category.find({ _id: categoryId });
    const locations = await Location.find({ category: category });
    res.status(200).json(locations);
  } catch (error) {
    res.send({ message: error.message });
  }
}

exports.categoryService = {
  createCategory,
  listAllCategories,
  getCategoryById,
  deleteCategory,
  addCategoryToLocation,
  listLocationsByCategory,
};
