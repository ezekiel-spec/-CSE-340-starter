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

// Route to build management view
router.get("/", utilities.handleErrors(invController.buildManagement));

// Route to build add-classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// Route to build add-inventory view
router.get("/add-vehicle", utilities.handleErrors(invController.buildAddInventory));

/* ***********************
 * AJAX Data Route
 * *********************** */
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

/* ***********************
 * Edit Inventory Route
 * *********************** */
router.get("/edit/:inv_id", utilities.handleErrors(invController.editInventoryView));

/* ***********************
 * Process Data Routes (Post)
 * *********************** */
// Route to process the update request
router.post(
  "/update",
  validate.inventoryRules(),
  validate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

// Process the classification data
router.post(
  "/add-classification",
  validate.classificationRules(),
  validate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);

// Process the inventory data
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
// Route to build delete confirmation view
router.get("/delete/:inv_id", utilities.handleErrors(invController.deleteView));

module.exports = router;