// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build a specific vehicle detail view
// This uses the invId parameter to pull the correct car
router.get("/detail/:invId", utilities.handleErrors(invController.getVehicleDetail));

// Route to trigger intentional 500 error
// This fulfills the requirement to test the error handler middleware
router.get("/trigger-error", utilities.handleErrors(invController.triggerError));

module.exports = router;