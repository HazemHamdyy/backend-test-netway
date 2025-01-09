import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "The user must have a name"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "This email is already in use"],
    lowerCase: true,
  },
  password: {
    type: String,
    required: [true, 'The user must have a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select:false
},
role: {
  type: String,
  enum: ['CLIENT', 'ADMIN'],
  default: 'CLIENT'
},
});

userSchema.pre('save',async function(next){
  if(this.isModified('password')){
   this.password = await bcrypt.hash(this.password, 12)
  }
  return next()
})

userSchema.methods.isCorrectPassword = async function(candidatePassword,userPassword){
  return await bcrypt.compare(candidatePassword,userPassword)
}

const User = mongoose.model('User',userSchema)
export default User 

