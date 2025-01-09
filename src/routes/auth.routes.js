import express from 'express'
import {signup, login} from '../controllers/auth.controller.js'
import userCreateValidator from '../middlewares/user-create-validator.middleware.js'
import handleValidation from '../middlewares/handle-validation.middleware.js'


const authRoutes = express.Router()  
authRoutes.post('/signup',userCreateValidator, handleValidation, signup)
authRoutes.post('/login', login)

export default authRoutes