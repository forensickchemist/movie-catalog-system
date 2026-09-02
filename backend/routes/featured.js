const express = require("express");
const Featured = require("../controllers/featured");
const { protect, adminOnly } = require("../middleware/auth");
const router = express.Router();

// Public route
router.get(
    "/current",
    Featured.getCurrentFeatured
);

// Admin route
router.put(
    "/:year/:month",
    protect,
    adminOnly,
    Featured.setFeatured
);

module.exports = router;