import AppError from "../utils/app.error.js";
import asyncHandler from "../utils/async-handler.js";
import { promisify } from 'util';
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";




const protect = asyncHandler(async (req,res,next)=>{
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1]
  }

  if(!token){
      return next(new AppError('You are not logged in!',401))
  } 

  const decoded = await promisify(jwt.verify)(token,'secret-key')

  const currentUser = await User.findById(decoded.id)
   
  if(!currentUser){
      return next(new AppError('The User belongs to this token does no longer exist.',401))
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.currentUser = currentUser
  next()
})

export default protect