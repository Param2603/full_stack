import express from 'express'
import { allUser, changePassword, forgotPassword, getUserById, login, logout, register, reVerify, verify, verifyOTP } from '../controllers/userController.js'
import { isAdmin, isAuthenticated } from '../middleware/isAuthenticated.js'

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/verify', verify)
userRouter.post('/reverify', reVerify)
userRouter.post('/login', login)
userRouter.post('/logout', isAuthenticated, logout)
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/verify-otp/:email', verifyOTP) 
userRouter.post('/change-password/:email', changePassword)
userRouter.get('/all-user', isAuthenticated, isAdmin, allUser)
userRouter.get('/get-user/:userId', getUserById)
 
export default userRouter
