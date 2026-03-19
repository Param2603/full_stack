import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { addToCart, getCart, removeFromCart, updateQuantity } from '../controllers/cartController.js'

const cartRouter = express.Router()

cartRouter.get('/', isAuthenticated, getCart)
cartRouter.post('/add', isAuthenticated, addToCart)
cartRouter.put('/update', isAuthenticated, updateQuantity)
cartRouter.delete('/remove', isAuthenticated, removeFromCart)

export default cartRouter