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
router.get(
  "/", 
  utilities.checkLogin, 
  utilities.handleErrors(accountController.buildManagementView)
)

/* ***********************
 * Deliver Account Update View (Task 5)
 * *********************** */
router.get(
  "/update/:account_id",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildAccountUpdate)
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
 * Process Account Update (Task 5)
 * *********************** */
router.post(
  "/update",
  regValidate.updateAccountRules(), 
  regValidate.checkUpdateData,      
  utilities.handleErrors(accountController.updateAccount)
)

/* ***********************
 * Process Password Update (Task 5)
 * *********************** */
router.post(
  "/password",
  regValidate.passwordRules(),      
  regValidate.checkPasswordData,    
  utilities.handleErrors(accountController.updatePassword)
)

/* ***********************
 * Process Wishlist Add (Final Enhancement)
 * *********************** */
router.post(
  "/wishlist",
  utilities.checkLogin,
  utilities.handleErrors(accountController.addWishlistItem)
)

/* ***********************
 * Process Logout Request (Task 6)
 * *********************** */
router.get("/logout", utilities.handleErrors(accountController.accountLogout))

module.exports = router