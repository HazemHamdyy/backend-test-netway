import Product from "../models/product.model.js";
import AppError from "../utils/app.error.js";
import asyncHandler from "../utils/async-handler.js";
import cache from "../utils/cache.manager.js"

const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
});

const findProducts = asyncHandler(async (req, res, next) => {
  const category = req.query.category;
  const query = {};
  if (category) {
    query.category = category;
    const cacheKey = category.toLowerCase();
    cache.get(cacheKey, async (err, cachedData) => {
      if (cachedData) {
        console.log("Cache hit");
        return res.status(200).json({
          status: "success",
          data: {
            products: cachedData,
          },
        });
      }
    });
  }
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = 5; // Limit to 5 products per page
  const skip = (page - 1) * limit;

  const products = await Product.find(query)
    .sort({ price: -1 }) // Sort by price in descending order
    .skip(skip) // Skip products for previous pages
    .limit(limit); // Limit to 5 products per page
  if (category) {
    const cacheKey = category.toLowerCase();
    cache.set(cacheKey, products, { ttl: 1800 });
  }
  // Send response
  res.status(200).json({
    status: "success",
    currentPage: page,
    data: {
      products,
    },
  });
});

const findProductById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return next(new AppError("No product with this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  await Product.findByIdAndDelete(id);
  res.status(204).json({
    status: "success",
  });
});

export {
  createProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};
