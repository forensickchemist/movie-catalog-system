const express = require("express");
const { register, login, getCurrentUser } = require("../controllers/user");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getCurrentUser);

module.exports = router;







































