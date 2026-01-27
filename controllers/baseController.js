const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav() // This fetches the categories from the DB
  res.render("index", {title: "Home", nav})
}

module.exports = baseController