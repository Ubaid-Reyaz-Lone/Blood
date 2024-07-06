const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  bloodGroupDetailsController,
} = require("../controllers/AnalyticController");

const router = express.Router();

// Get Blood Data
router.get("/bloodGroups-data", authMiddleware, bloodGroupDetailsController);

module.exports = router;
