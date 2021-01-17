const exppress = require("express");
const router = exppress.Router();

const {
  signup,
  login,
} = require("../controllers/users");


router.post("/signup", signup);
router.post("/login", login);



module.exports = router;
