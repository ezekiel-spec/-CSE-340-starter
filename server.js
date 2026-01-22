const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const expressLayouts = require("express-ejs-layouts")
const baseController = require("./controllers/baseController")
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
app.get("/", async function(req, res) {
  const nav = await utilities.getNav()
  res.render("index", {title: "Home", nav})
})
/* ***********************
 * Local Server Information
 * *********************** */
const port = process.env.PORT || 5500
const host = process.env.HOST || 'localhost'
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
