/* ******************************************
 * This is the main entry point for the application.
 * It connects all the pieces (MVC) and handles errors.
 ******************************************** */

// --- Required Resources ---
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const expressLayouts = require("express-ejs-layouts")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities/")

/* ***********************
 * View Engine Setup
 * *********************** */
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") 

/* ***********************
 * Routes
 * *********************** */
app.use(static)

// Index Route
app.get("/", utilities.handleErrors(baseController.buildHome))

// Inventory routes - mapped to /inv
app.use("/inv", inventoryRoute)

/* ***********************
 * Local Error Handling 
 * File Not Found (404) Handler - MUST be the last route
 * *********************** */
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/* ***********************
* Express Error Handler
* This is the "Safety Net" for 500 errors.
* Place after all other middleware.
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  
  // Custom message logic
  let message = err.status === 404 ? err.message : 'Oh no! There was a crash. Maybe try a different route?'
  
  res.status(err.status || 500).render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})

/* ***********************
 * Server Information & Listening
 * *********************** */
const port = process.env.PORT || 5500
const host = process.env.HOST || '0.0.0.0'

app.listen(port, host, () => {
  console.log(`app listening on http://${host}:${port}`)
})