// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')

/* ***********************
 * Deliver Login View
 * *********************** */
router.get("/login", utilities.handleErrors(accountController.buildLogin))

/* ***********************
 * Deliver Registration View
 * *********************** */
router.get("/register", utilities.handleErrors(accountController.buildRegistration))

/* ***********************
 * Deliver Account Management View (Default Route)
 * *********************** */
// If your server crashes here, ensure utilities.checkLogin exists in utilities/index.js
router.get(
  "/", 
  utilities.checkLogin, 
  utilities.handleErrors(accountController.buildManagementView)
)

/* ***********************
 * Process Registration Request
 * *********************** */
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

/* ***********************
 * Process Login Request
 * *********************** */
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

/* ***********************
 * Process Logout Request
 * *********************** */
router.get("/logout", utilities.handleErrors(accountController.accountLogout))

module.exports = router