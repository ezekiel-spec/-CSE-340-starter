const pool = require("../database/")

const wishlistModel = {}

/* Add to Wishlist */
wishlistModel.addWishlistItem = async (inv_id, account_id) => {
  try {
    const sql = "INSERT INTO wishlist (inv_id, account_id) VALUES ($1, $2) RETURNING *"
    return await pool.query(sql, [inv_id, account_id])
  } catch (error) {
    return error.message
  }
}

/* Get User's Wishlist */
wishlistModel.getWishlistByAccountId = async (account_id) => {
  try {
    const sql = `SELECT * FROM wishlist AS w 
                 JOIN inventory AS i ON w.inv_id = i.inv_id 
                 WHERE w.account_id = $1`
    const data = await pool.query(sql, [account_id])
    return data.rows
  } catch (error) {
    return error.message
  }
}

module.exports = wishlistModel