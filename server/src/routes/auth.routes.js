const express=require('express');
const { userSignup, userLogin, userLogout, getMydetails } = require('../controllers/authController');
const { authUser } = require('../middlewares/auth.middleware');

const authRouter=express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", userSignup)


/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/login", userLogin)


/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
authRouter.get("/logout", userLogout)


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get("/myProfile", authUser, getMydetails)


module.exports = authRouter