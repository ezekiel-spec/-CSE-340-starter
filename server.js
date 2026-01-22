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
app.set("layout", "./layouts/layout") // Informs express-ejs-layouts where the main template is

/* ***********************
 * Routes
 * *********************** */
// Use the static routes for public assets (css, images, js)
app.use(static)

// Index Route - Altered to use the baseController
app.get("/", baseController.buildHome)

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 * *********************** */
const port = process.env.PORT || 5500
const host = process.env.HOST || 'localhost'

/* ***********************
 * Log statement to confirm server operation
 * *********************** */
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})