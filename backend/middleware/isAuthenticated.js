import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(400).json({
                success: false,
                message: "Authorization token is invalid"
            })
        }

        const token = authHeader.split(" ")[1]
        let decoded
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY)
        } catch (err) {
            if(err.name === "TokenExpiredError"){
                return res.status(400).json({
                success: false,
                message: "The registration token has expired"
            })
            }
            return res.status(400).json({
                success: false,
                message: "Access token is invalid"
            })           
        }

        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            }) 
        }
        req.id = user._id
        next()

    } catch (err) {
        return res.status(500).json({
                success: false,
                message: err.message
            })
    }
}