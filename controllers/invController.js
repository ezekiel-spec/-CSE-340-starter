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
  const title = `${data.inv_make} ${data.inv_model}`
  
  res.render("./inventory/detail", {
    title: title,
    nav,
    detailHtml,
  })
}

/* ***************************
 * Trigger Intentional 500 Error
 * ************************** */
invCont.triggerError = async function (req, res, next) {
  const error = new Error("This is an intentional 500 error for testing!")
  error.status = 500
  next(error)
}