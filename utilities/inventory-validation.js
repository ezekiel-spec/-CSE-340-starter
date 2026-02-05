const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/* **********************************
 * Classification Validation Rules
 * ********************************* */
validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .isAlphanumeric()
      .withMessage("Please provide a valid classification name without spaces or special characters."),
  ]
}

/* ******************************
 * Check data and return errors (RENAMED TO MATCH ROUTE)
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => { // Renamed from checkListData
  const { classification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "Add New Classification",
      nav,
      classification_name,
    })
    return
  }
  next()
}

/* **********************************
 * Inventory Validation Rules
 * ********************************* */
validate.inventoryRules = () => {
  return [
    body("classification_id").trim().notEmpty().isNumeric().withMessage("Please select a classification."),
    body("inv_make").trim().escape().notEmpty().isLength({ min: 3 }).withMessage("Please provide a valid make."),
    body("inv_model").trim().escape().notEmpty().isLength({ min: 3 }).withMessage("Please provide a valid model."),
    body("inv_year").trim().isNumeric().isLength({ min: 4, max: 4 }).withMessage("Please provide a 4-digit year."),
    // Added missing fields below to ensure database doesn't reject them
    body("inv_description").trim().escape().notEmpty().withMessage("Description is required."),
    body("inv_image").trim().notEmpty().withMessage("Image path is required."),
    body("inv_thumbnail").trim().notEmpty().withMessage("Thumbnail path is required."),
    body("inv_price").trim().isDecimal().withMessage("Please provide a valid price."),
    body("inv_miles").trim().isNumeric().withMessage("Please provide valid mileage."),
    body("inv_color").trim().escape().notEmpty().withMessage("Please provide a color."),
  ]
}

/* ******************************
 * Check data and return errors or continue to add-inventory
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
  const {
    inv_make, inv_model, inv_year, inv_description,
    inv_image, inv_thumbnail, inv_price, inv_miles,
    inv_color, classification_id,
  } = req.body
  
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationSelect = await utilities.buildClassificationList(classification_id)
    res.render("inventory/add-inventory", {
      errors,
      title: "Add New Vehicle",
      nav,
      classificationSelect,
      inv_make, inv_model, inv_year, inv_description,
      inv_image, inv_thumbnail, inv_price, inv_miles, inv_color,
    })
    return
  }
  next()
}

module.exports = validate