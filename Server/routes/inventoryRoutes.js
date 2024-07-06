const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

// Routes

// Add inventory
router.post("/create-inventory", authMiddleware, createInventoryController);

// Get recent blood records
router.get(
  "/get-recent-inventory",
  authMiddleware,
  getRecentInventoryController
);

// Get all blood records
router.get("/get-inventory", authMiddleware, getInventoryController);

// Get all blood records for hospitals
router.get(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController
);

// Get donor records
router.get("/get-donars", authMiddleware, getDonarsController);

// Get hospital records
router.get("/get-hospitals", authMiddleware, getHospitalController);

// Get organization records
router.get("/get-organisation", authMiddleware, getOrganisationController);

// Get organization records for hospital
router.get(
  "/get-organisation-for-hospital",
  authMiddleware,
  getOrganisationForHospitalController
);

module.exports = router;
