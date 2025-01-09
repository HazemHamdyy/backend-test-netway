import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      minlength: [3, 'Product name must be at least 3 characters'],
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      minlength: [3, 'Category must be at least 3 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Create an index on the category field to speed up queries that filter by category
productSchema.index({ category: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
