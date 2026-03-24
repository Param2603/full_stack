import express from "express"
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js"
import { createOrder, getAllOrdersAdmin, getMyOrder, getSalesData, getuserOrders, verifyPayment } from "../controllers/orderController.js"

const orderRouter = express.Router()

orderRouter.post("/create-order", isAuthenticated, createOrder)
orderRouter.post("/verify-payment", isAuthenticated, verifyPayment)
orderRouter.get("/myorder", isAuthenticated, getMyOrder)
orderRouter.get("/all", isAuthenticated, isAdmin, getAllOrdersAdmin)
orderRouter.get("/user-order/:userId", isAuthenticated, isAdmin, getuserOrders)
orderRouter.get("/sales", isAuthenticated, isAdmin, getSalesData)

export default orderRouter