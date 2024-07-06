const userModel = require("../models/userModel");
const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");

// Create Inventory Controller/API
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType, bloodGroup, quantity } = req.body;
    const user = await userModel.findOne({ email });

    // if (!user) {
    //   throw new Error("User not found");
    // }

    if (inventoryType === "out") {
      const organisation = new mongoose.Types.ObjectId(req.body.userId);

      // Calculate total IN quantity for the requested blood group
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;

      // Calculate total OUT quantity for the requested blood group
      const totalOutOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBlood[0]?.total || 0;

      // Calculate available blood quantity
      const availableQuantityOfBlood = totalIn - totalOut;

      if (availableQuantityOfBlood < quantity) {
        return res.status(400).send({
          success: false,
          message: `Only ${availableQuantityOfBlood}ML of ${bloodGroup.toUpperCase()} is available`,
        });
      }
      const { userId } = req.body;
      req.body.organisation = userId;
      req.body.hospital = userId;
      req.body.donor = userId;
    } else {
      const { userId } = req.body;
      req.body.donor = userId;
    }

    // Save inventory/record
    const inventory = new inventoryModel(req.body);
    await inventory.save();

    return res.status(201).send({
      success: true,
      message: "New blood record added",
    });
  } catch (error) {
    console.error(`Error in createInventoryController: ${error.message}`);
    return res.status(500).send({
      success: false,
      message: "Error in create inventory API",
      error: error.message,
    });
  }
};

// Get Inventory Controller/API
const getInventoryController = async (req, res) => {
  try {
    const { userId } = req.body;
    const inventory = await inventoryModel
      .find({ organisation: userId })
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Get all records successfully",
      inventory,
    });
  } catch (error) {
    console.error(`Error in getInventoryController: ${error.message}`);
    return res.status(500).send({
      success: false,
      message: "Error in getting inventory",
      error: error.message,
    });
  }
};

// Get Inventory Hospital Controller/API
const getInventoryHospitalController = async (req, res) => {
  try {
    const { filters } = req.body;
    const inventory = await inventoryModel
      .find(filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Get hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.error(`Error in getInventoryHospitalController: ${error.message}`);
    return res.status(500).send({
      success: false,
      message: "Error in consumer inventory",
      error: error.message,
    });
  }
};

// Get Recent Inventory Controller/API
const getRecentInventoryController = async (req, res) => {
  try {
    const { userId } = req.body;
    const inventory = await inventoryModel
      .find({ organisation: userId })
      .limit(3)
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Recent inventory data",
      inventory,
    });
  } catch (error) {
    console.error(`Error in getRecentInventoryController: ${error.message}`);
    return res.status(500).send({
      success: false,
      message: "Error in Recent Inventory API",
      error: error.message,
    });
  }
};

// Get Donars Controller/API
const getDonarsController = async (req, res) => {
  try {
    const { userId } = req.body;

    const donarIds = await inventoryModel.find({ organisation: userId });

    const donars = await userModel.find({ _id: { $in: donarIds[0].donars } });

    return res.status(200).send({
      success: true,
      message: "Donar record fetched successfully",
      donars,
    });
  } catch (error) {
    console.error(`Error in getDonarsController: ${error.message}`);
    return res.status(500).send({
      success: false,
      message: "Error in Donar records",
      error: error.message,
    });
  }
};

// Get Hospitals Controller/API
const getHospitalController = async (req, res) => {
  try {
    const { userId } = req.body;
    const hospitalIds = await inventoryModel.distinct("hospital", {
      organisation: userId,
    });
    const hospitals = await userModel.find({ _id: { $in: hospitalIds } });

    return res.status(200).send({
      success: true,
      message: "Hospital data fetched successfully",
      hospitals,
    });
  } catch (error) {
    console.error(`Error in getHospitalController: ${error.message}`);
    return res.status(500).send({
      success: false,
      message: "Error in get hospital API",
      error: error.message,
    });
  }
};

// Get Organisations Controller/API
const getOrganisationController = async (req, res) => {
  try {
    const { userId } = req.body;
    const orgIds = await inventoryModel.distinct("organisation", {
      donor: userId,
    });
    const organisations = await userModel.find({ _id: { $in: orgIds } });

    return res.status(200).send({
      success: true,
      message: "Organisation data fetched successfully",
      organisations,
    });
  } catch (error) {
    console.error(`Error in getOrganisationController: ${error.message}`);
    return res.status(500).send({
      success: false,
      message: "Error in Organisation API",
      error: error.message,
    });
  }
};

// Get Organisations for Hospital Controller/API
const getOrganisationForHospitalController = async (req, res) => {
  try {
    const { userId } = req.body;
    const orgIds = await inventoryModel.distinct("organisation", {
      hospital: userId,
    });
    const organisations = await userModel.find({ _id: { $in: orgIds } });

    return res.status(200).send({
      success: true,
      message: "Hospital (Organisation) data fetched successfully",
      organisations,
    });
  } catch (error) {
    console.error(
      `Error in getOrganisationForHospitalController: ${error.message}`
    );
    return res.status(500).send({
      success: false,
      message: "Error in Hospital (Organisation) API",
      error: error.message,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
};
