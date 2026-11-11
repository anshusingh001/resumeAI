const bcrypt=require('bcryptjs')
const userModel=require('../models/user.model')
const tokenBlacklistModel = require("../models/blacklist.model")
const jwt=require("jsonwebtoken")

/**
 * @name userSignup
 * @description register a new user in the application
 * @access public
 */
const userSignup = async (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password ){
        return res.status(400).json({
            message:"Please provide all the details"
        })
    }

    const userAlreadyexists=await userModel.findOne({
        $or: [{ username},{ email }]
    })

    if(userAlreadyexists){
        return res.status(400).json({
            message:"Account already exists with this username or email address"
        })
    }
 
    const hashed= await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashed
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)


    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name userLogin
 * @description Login a user in the application, expects email and passeord in request body
 * @access public
 */
const userLogin = async (req, res) => {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)
    res.status(200).json({
        message: "User loggedIn successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


/**
 * @name userLogout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
const userLogout = async (req, res) => {
    const token = req.cookies.token

    if (token) {
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}

/**
 * @name getMydetails
 * @description get the current logged in user details.
 * @access private
 */
const getMydetails = async (req, res) => {

    const user = await userModel.findById(req.user.id)



    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

module.exports = {
   userSignup,
   userLogin,
   userLogout,
   getMydetails
}