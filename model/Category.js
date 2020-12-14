const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: 'String',
    required: true,
  },
  subCategoryId: {
    type: 'Number',
  },
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
