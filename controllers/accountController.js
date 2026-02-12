const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const accountModel = require("../models/account-model")
const wishlistModel = require("../models/wishlist-model") // NEW: Import wishlist model
const utilities = require("../utilities/")
require("dotenv").config()

const accountController = {}

/* ****************************************
 * Deliver login view
 * *************************************** */
accountController.buildLogin = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
    errors: null,
  })
}

/* ****************************************
 * Deliver registration view
 * *************************************** */
accountController.buildRegistration = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Registration",
    nav,
    errors: null,
  })
}

/* ****************************************
 * Process Registration
 * *************************************** */
accountController.registerAccount = async function (req, res) {
  let nav = await utilities.getNav()
  const {
    account_firstname,
    account_lastname,
    account_email,
    account_password,
  } = req.body

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", "Sorry, there was an error processing the registration.")
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
    return
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash("notice", `Congratulations, you're registered ${account_firstname}. Please log in.`)
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }
}

/* ****************************************
 * Process login request
 * ************************************ */
accountController.accountLogin = async function (req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    })
    return
  }

  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      if (process.env.NODE_ENV === 'development') {
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      } else {
        res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
      }
      return res.redirect("/account/")
    } else {
      req.flash("notice", "Please check your credentials and try again.")
      res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        account_email,
      })
    }
  } catch (error) {
    throw new Error('Access Forbidden')
  }
}

/* ****************************************
 * Deliver account management view
 * UPDATED for Wishlist Enhancement
 * ************************************ */
accountController.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav()
  
  // NEW: Fetch wishlist items for the logged-in user
  const account_id = res.locals.accountData.account_id
  const wishlist = await wishlistModel.getWishlistByAccountId(account_id)
  
  res.render("account/management", {
    title: "Account Management",
    nav,
    errors: null,
    wishlist, // NEW: Pass wishlist data to the view
  })
}

/* ****************************************
 * Process Add to Wishlist
 * NEW: Enhancement Function
 * ************************************ */
accountController.addWishlistItem = async function (req, res) {
  const { inv_id } = req.body
  const account_id = res.locals.accountData.account_id
  
  const result = await wishlistModel.addWishlistItem(inv_id, account_id)
  
  if (result) {
    req.flash("notice", "Vehicle added to your wishlist!")
  } else {
    req.flash("notice", "Sorry, could not add vehicle to wishlist.")
  }
  res.redirect("/account/")
}

/* ****************************************
 * Task 5: Deliver account update view
 * ************************************ */
accountController.buildAccountUpdate = async function (req, res, next) {
  let nav = await utilities.getNav()
  const account_id = parseInt(req.params.account_id)
  const accountData = await accountModel.getAccountById(account_id)
  res.render("account/update", {
    title: "Update Account Information",
    nav,
    errors: null,
    account_firstname: accountData.account_firstname,
    account_lastname: accountData.account_lastname,
    account_email: accountData.account_email,
    account_id: accountData.account_id,
  })
}

/* ****************************************
 * Task 5: Process Account Update
 * ************************************ */
accountController.updateAccount = async function (req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_id } = req.body
  const updateResult = await accountModel.updateAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_id
  )

  if (updateResult) {
    const updatedData = await accountModel.getAccountById(account_id)
    delete updatedData.account_password
    const accessToken = jwt.sign(updatedData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
    res.cookie("jwt", accessToken, { httpOnly: true, secure: process.env.NODE_ENV !== 'development', maxAge: 3600 * 1000 })
    
    req.flash("notice", "Account information updated successfully.")
    res.redirect("/account/")
  } else {
    req.flash("notice", "Sorry, the update failed.")
    res.status(501).render("account/update", {
      title: "Update Account Information",
      nav,
      errors: null,
      account_firstname,
      account_lastname,
      account_email,
      account_id,
    })
  }
}

/* ****************************************
 * Task 5: Process Password Update
 * ************************************ */
accountController.updatePassword = async function (req, res) {
  let nav = await utilities.getNav()
  const { account_password, account_id } = req.body

  let hashedPassword = await bcrypt.hashSync(account_password, 10)
  const updateResult = await accountModel.updatePassword(hashedPassword, account_id)

  if (updateResult) {
    req.flash("notice", "Password updated successfully.")
    res.redirect("/account/")
  } else {
    req.flash("notice", "Sorry, the password update failed.")
    const accountData = await accountModel.getAccountById(account_id)
    res.status(501).render("account/update", {
      title: "Update Account Information",
      nav,
      errors: null,
      account_firstname: accountData.account_firstname,
      account_lastname: accountData.account_lastname,
      account_email: accountData.account_email,
      account_id,
    })
  }
}

/* ****************************************
 * Process logout request (Task 6)
 * ************************************ */
accountController.accountLogout = async function (req, res) {
  res.clearCookie("jwt")
  res.redirect("/")
}

module.exports = accountController