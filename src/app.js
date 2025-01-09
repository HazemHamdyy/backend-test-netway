import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import errorHandler from "./middlewares/error-handler.middleware.js";
import AppError from "./utils/app.error.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);


app.all('*',(req,res,next)=>{
  next(new AppError(`can't find ${req.originalUrl}`,404))
})

app.use(errorHandler);

const mongoURI = 'mongodb://localhost:27017/netway_db';


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });