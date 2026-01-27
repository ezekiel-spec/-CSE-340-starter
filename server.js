const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const expressLayouts = require("express-ejs-layouts")
const baseController = require("./controllers/baseController")

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
app.get("/", baseController.buildHome)

/* ***********************
 * Server Information
 * *********************** */
const port = process.env.PORT || 5500
// Change: Render requires 0.0.0.0 to accept outside traffic
const host = process.env.HOST || '0.0.0.0'

/* ***********************
 * Log statement to confirm server operation
 * *********************** */
app.listen(port, host, () => {
  console.log(`app listening on http://${host}:${port}`)
})