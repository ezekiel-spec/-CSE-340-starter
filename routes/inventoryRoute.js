// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const validate = require('../utilities/inventory-validation')

/* ***********************
 * View Routes
 * *********************** */

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build vehicle detail view
router.get("/detail/:invId", utilities.handleErrors(invController.getVehicleDetail));

// Route to build management view (Task 1)
router.get("/", utilities.handleErrors(invController.buildManagement));

// Route to build add-classification view (Task 2)
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// Route to build add-inventory view (Task 3)
router.get("/add-vehicle", utilities.handleErrors(invController.buildAddInventory));

/* ***********************
 * Process Data Routes (Post)
 * *********************** */

// Process the classification data (Task 2)
router.post(
  "/add-classification",
  validate.classificationRules(),
  validate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);

// Process the inventory data (Task 3)
router.post(
  "/add-vehicle",
  validate.inventoryRules(),
  validate.checkInventoryData,
  utilities.handleErrors(invController.addInventoryItem)
);

/* ***********************
 * Error Testing Route
 * *********************** */
router.get("/error", utilities.handleErrors(invController.triggerError));

module.exports = router;