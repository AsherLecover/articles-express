const mongoose = require("mongoose");
const Categorey = require("../models/category");

module.exports = {
  getAllCategories: (req, res) => {
    Categorey.find()
      .then((categories) => {
        res.status(200).json({
          categories,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },

  createCategory: (req, res) => {
    const { title, description } = req.body;

    const category = new Categorey({
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
    });

    category
      .save()
      .then(() => {
        res.status(200).json({
          message: "Created Category",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },

  getCategory: (req, res) => {
    const categoryId = req.params.categoryId;

    Categorey.findById(categoryId)
      .then((category) => {
        res.status(200).json({
          category,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },

  updateCategory: (req, res) => {
    const categoryId = req.params.categoryId;

    Categorey.updateOne({ _id: categoryId }, req.body)
      .then(() => {
        res.status(200).json({
          message: `Category Updated`,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },

  deleteCategory: (req, res) => {
    const categoryId = req.params.categoryId;

    Categorey.remove({ _id: categoryId })
      .then(() => {
        res.status(200).json({
          message: ` Category Deleted -  ${categoryId}`,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
};
