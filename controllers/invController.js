const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 * Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 * Deliver vehicle detail view
 * ************************** */
invCont.getVehicleDetail = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getInventoryById(inv_id)
  
  if (!data) {
    const err = new Error('Vehicle not found')
    err.status = 404
    return next(err)
  }

  const detailHtml = await utilities.buildVehicleDetail(data)
  let nav = await utilities.getNav()
  const title = `${data.inv_year} ${data.inv_make} ${data.inv_model}`
  
  res.render("./inventory/detail", {
    title: title,
    nav,
    detailHtml,
  })
}

/* ***************************
 * Trigger intentional 500 error
 * ************************** */
invCont.triggerError = async function (req, res, next) {
  const error = new Error("This is an intentional 500 error for testing!")
  error.status = 500
  next(error)
}

module.exports = invCont