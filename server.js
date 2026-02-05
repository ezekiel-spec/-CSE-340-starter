const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const app = express()
const static = require("./routes/static")
const inventoryRoute = require("./routes/inventoryRoute")
const baseController = require("./controllers/baseController")
const session = require("express-session")
const flash = require("connect-flash")
const bodyParser = require("body-parser")
const utilities = require("./utilities/")

/* ***********************
 * Middleware
 * *********************** */

// Body Parser Middleware to handle POST request data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Session Middleware
app.use(session({
  secret: 'secret', 
  resave: true,
  saveUninitialized: true
}))

// Flash Messages Middleware
app.use(flash())

// Express Messages Middleware (Solves the "messages is not defined" error)
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

/* ***********************
 * View Engine and Layouts
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") 

/* ***********************
 * Static Assets
 *************************/
app.use(express.static('public'))

/* ***********************
 * Routes
 *************************/
app.use(static)
// Index route
app.get("/", baseController.buildHome)
// Inventory routes
app.use("/inv", inventoryRoute)

/* ***********************
 * Error Handling Middleware (NEW - Task 1 Requirement)
 * *********************** */

// File Not Found Route - must be the last route in the list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

// General error handler
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  
  let message = err.status == 404 
    ? err.message 
    : 'Oh no! There was a crash. Maybe try a different route?'

  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})

/* ***********************
 * Local Server Information
 *************************/
const port = process.env.PORT || 5500
const host = process.env.HOST || 'localhost'

app.listen(port, () => {
  console.log(`app listening on http://${host}:${port}`)
})