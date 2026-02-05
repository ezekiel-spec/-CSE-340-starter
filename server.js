const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const app = express()
const static = require("./routes/static")
const inventoryRoute = require("./routes/inventoryRoute")
const baseController = require("./controllers/baseController")
const session = require("express-session")
const flash = require("connect-flash")
const bodyParser = require("body-parser")

/* ***********************
 * Middleware
 * *********************** */

// Body Parser Middleware (to handle form data)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Session Middleware
app.use(session({
  secret: 'secret', // Use a real secret in production
  resave: true,
  saveUninitialized: true
}))

// Flash Messages Middleware
app.use(flash())

// Express Messages Middleware (to satisfy "messages is not defined")
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
 * Local Server Information
 *************************/
const port = process.env.PORT || 5500
const host = process.env.HOST || 'localhost'

app.listen(port, () => {
  console.log(`app listening on http://${host}:${port}`)
})