const invModel = require("../models/inventory-model")
const Util = {}

/* **************************************
 * Build the Navigation
 * ************************************ */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list += `<a href="/inv/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles">${row.classification_name}</a>`
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
 * Build the classification grid
 * ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      // Links to the detail view
      grid +=  `<a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">`
      // Uses the thumbnail path directly from the database
      grid += `<img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors" /></a>`
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += `<h2><a href="/inv/detail/${vehicle.inv_id}">${vehicle.inv_make} ${vehicle.inv_model}</a></h2>`
      grid += `<span>$${new Intl.NumberFormat('en-US').format(vehicle.inv_price)}</span>`
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
 * Build the vehicle detail view
 * ************************************ */
Util.buildVehicleDetail = async function(vehicle) {
  // Uses the full image path from the database
  let detailHtml = '<section class="vehicle-detail">'
  detailHtml += `<img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">`
  detailHtml += '<div class="vehicle-info">'
  detailHtml += `<h2>${vehicle.inv_make} ${vehicle.inv_model} Details</h2>`
  detailHtml += `<p><strong>Price:</strong> $${new Intl.NumberFormat('en-US').format(vehicle.inv_price)}</p>`
  detailHtml += `<p><strong>Description:</strong> ${vehicle.inv_description}</p>`
  detailHtml += `<p><strong>Color:</strong> ${vehicle.inv_color}</p>`
  detailHtml += `<p><strong>Mileage:</strong> ${new Intl.NumberFormat('en-US').format(vehicle.inv_miles)} miles</p>`
  detailHtml += '</div></section>'
  return detailHtml
}

/* ****************************************
 * Middleware For Handling Errors
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util