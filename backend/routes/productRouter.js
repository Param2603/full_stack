import express from 'express'
import { addProduct, deleteProduct, getAllProduct, updateProduct } from '../controllers/productController.js'
import { isAdmin, isAuthenticated } from '../middleware/isAuthenticated.js'
import { multipleUpload } from '../middleware/multer.js'

const productRouter = express.Router()

productRouter.post('/add', isAuthenticated, isAdmin, multipleUpload, addProduct)
productRouter.get('/getallproducts', getAllProduct)
productRouter.delete('/delete/:productId', isAuthenticated, isAdmin, deleteProduct)
productRouter.put('/update/:productId', isAuthenticated, isAdmin, multipleUpload, updateProduct)

export default productRouter