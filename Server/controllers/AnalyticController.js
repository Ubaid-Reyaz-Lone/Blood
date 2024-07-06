const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");

// Get Blood Group Details
const bloodGroupDetailsController = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const organisation = new mongoose.Types.ObjectId(req.body.userId);

    const bloodGroupDataPromises = bloodGroups.map(async (bloodGroup) => {
      // Aggregate total IN blood details
      const totalIn = await inventoryModel.aggregate([
        {
          $match: {
            bloodGroup,
            inventoryType: "in",
            organisation,
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$quantity" },
          },
        },
      ]);

      // Aggregate total OUT blood details
      const totalOut = await inventoryModel.aggregate([
        {
          $match: {
            bloodGroup,
            inventoryType: "out",
            organisation,
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$quantity" },
          },
        },
      ]);

      // Calculate available blood quantity
      const availableBlood =
        (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

      // Return data for this blood group
      return {
        bloodGroup,
        totalIn: totalIn[0]?.total || 0,
        totalOut: totalOut[0]?.total || 0,
        availableBlood,
      };
    });

    // Wait for all promises to resolve
    const bloodGroupData = await Promise.all(bloodGroupDataPromises);

    // Return response
    return res.status(200).send({
      success: true,
      message: "Blood Group Data Fetched Successfully",
      bloodGroupData,
    });
  } catch (error) {
    console.error(`Error in bloodGroupDetailsController: ${error.message}`);
    return res.status(500).send({
      success: false,
      message: "Error in Blood Group Data Analytics API",
      error: error.message,
    });
  }
};

module.exports = { bloodGroupDetailsController };
