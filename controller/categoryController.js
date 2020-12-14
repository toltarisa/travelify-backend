const Category = require('../model/Category');
const Location = require('../model/Location');

async function createCategory(req, res) {
  const category = new Category({
    categoryName: req.body.name,
    subCategoryId: req.body.subCategoryId,
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
    await Location.findByIdAndUpdate(
      locationId,
      { category: categoryId },
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

module.exports.createCategory = createCategory;
module.exports.listAllCategories = listAllCategories;
module.exports.getCategoryById = getCategoryById;
module.exports.deleteCategory = deleteCategory;
module.exports.addCategoryToLocation = addCategoryToLocation;
