import express from 'express'
import { addProduct, getAllProduct } from '../controllers/productController'
import { isAdmin, isAuthenticated } from '../middleware/isAuthenticated'
import { multipleUpload } from '../middleware/multer'

const productRouter = express.Router()

productRouter.post('/add', isAuthenticated, isAdmin, multipleUpload, addProduct)
productRouter.get('/getallproducts', getAllProduct)

export default productRouter