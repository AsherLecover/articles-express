const exppress = require("express");
const router = exppress.Router();

const {

  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory

} = require("../controllers/categories");

router.get("/", getAllCategories);

router.get('/:categoryId', getCategory)

router.post("/", createCategory);

router.patch("/:categoryId", updateCategory);

router.delete("/:categoryId", deleteCategory);

module.exports = router;
