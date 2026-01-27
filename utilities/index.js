const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the vehicle detail view HTML
* ************************************ */
Util.buildVehicleDetail = async function(data) {
  let display = '<div id="detail-display">'
  // Use the full-size image, not the thumbnail
  display += '<img src="' + data.inv_image + '" alt="Image of ' + data.inv_make + ' ' + data.inv_model + '">'
  display += '<div id="vehicle-details">'
  display += '<h2>' + data.inv_make + ' ' + data.inv_model + ' Details</h2>'
  
  // Format price as U.S. Dollars with commas
  const price = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(data.inv_price)
  display += '<p class="price"><strong>Price:</strong> ' + price + '</p>'
  
  display += '<p><strong>Description:</strong> ' + data.inv_description + '</p>'
  display += '<p><strong>Color:</strong> ' + data.inv_color + '</p>'
  
  // Format mileage with proper place value commas
  display += '<p><strong>Miles:</strong> ' + data.inv_miles.toLocaleString() + '</p>'
  
  display += '</div></div>'
  return display
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util