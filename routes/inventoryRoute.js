// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const validate = require('../utilities/inventory-validation')

/* ***********************
 * View Routes (Public)
 * *********************** */

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build vehicle detail view
router.get("/detail/:invId", utilities.handleErrors(invController.getVehicleDetail));

/* ***********************
 * Management View Routes (Authorized Only)
 * *********************** */

// Route to build management view
router.get("/", 
  utilities.checkAdminEmployee, 
  utilities.handleErrors(invController.buildManagement)
);

// Route to build add-classification view
router.get("/add-classification", 
  utilities.checkAdminEmployee, 
  utilities.handleErrors(invController.buildAddClassification)
);

// Route to build add-inventory view
router.get("/add-vehicle", 
  utilities.checkAdminEmployee, 
  utilities.handleErrors(invController.buildAddInventory)
);

/* ***********************
 * AJAX Data Route
 * *********************** */
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

/* ***********************
 * Edit/Delete Inventory Routes (GET) (Authorized Only)
 * *********************** */
router.get("/edit/:inv_id", 
  utilities.checkAdminEmployee, 
  utilities.handleErrors(invController.editInventoryView)
);

// Route to build delete confirmation view
router.get("/delete/:inv_id", 
  utilities.checkAdminEmployee, 
  utilities.handleErrors(invController.deleteView)
);

/* ***********************
 * Process Data Routes (Post) (Authorized Only)
 * *********************** */

// Route to process the update request
router.post(
  "/update",
  utilities.checkAdminEmployee,
  validate.inventoryRules(), 
  validate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

// Route to process the delete request
router.post(
  "/delete", 
  utilities.checkAdminEmployee,
  utilities.handleErrors(invController.deleteItem)
);

// Process the classification data
router.post(
  "/add-classification",
  utilities.checkAdminEmployee,
  validate.classificationRules(),
  validate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);

// Process the inventory data
router.post(
  "/add-vehicle",
  utilities.checkAdminEmployee,
  validate.inventoryRules(),
  validate.checkInventoryData,
  utilities.handleErrors(invController.addInventoryItem)
);

/* ***********************
 * Error Testing Route
 * *********************** */
router.get("/error", utilities.handleErrors(invController.triggerError));

module.exports = router;