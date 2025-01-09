import express from 'express'
import {createProduct, findProductById, findProducts, updateProduct, deleteProduct} from '../controllers/product.controller.js'
import protect from '../middlewares/protect.middleware.js'
import restrictedTo from '../middlewares/restricted-to.middleware.js'
import productCreateValidator from '../middlewares/product-create-validator.middleware.js'
import handleValidation from '../middlewares/handle-validation.middleware.js'
import productUpdateValidator from '../middlewares/product-update-validator.middleware.js'




const productRoutes = express.Router()  
productRoutes.post('/', protect, restrictedTo(['ADMIN']), productCreateValidator, handleValidation, createProduct)
productRoutes.get('/', findProducts)
productRoutes.get('/:id', findProductById)
productRoutes.put('/:id', protect, restrictedTo(['ADMIN']), productUpdateValidator, handleValidation, updateProduct)
productRoutes.delete('/:id', protect, restrictedTo(['ADMIN']), deleteProduct)

export default productRoutes