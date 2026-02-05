// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const regValidate = require("../utilities/inventory-validation") // We will create this next

// --- Existing Routes ---

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build a specific vehicle detail view
router.get("/detail/:invId", utilities.handleErrors(invController.getVehicleDetail));

// Route to trigger intentional 500 error
router.get("/trigger-error", utilities.handleErrors(invController.triggerError));


// --- Assignment 4: Management & Insertion Routes ---

// Task 1: Route to deliver the management view
router.get("/", utilities.handleErrors(invController.buildManagement));

// Task 2: Route to deliver the add-classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// Task 2: Route to process the new classification insertion
// Includes server-side validation middleware
router.post(
    "/add-classification", 
    regValidate.classificationRules(),
    regValidate.checkListData,
    utilities.handleErrors(invController.addClassification)
);

// Task 3: Route to deliver the add-inventory view
router.get("/add-vehicle", utilities.handleErrors(invController.buildAddInventory));

// Task 3: Route to process the new vehicle insertion
// Includes server-side validation middleware
router.post(
    "/add-vehicle",
    regValidate.inventoryRules(),
    regValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventoryItem)
);

module.exports = router;