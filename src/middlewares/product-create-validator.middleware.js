import { body } from 'express-validator';

 const productCreateValidator = [
  body('name')
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 3 }).withMessage('Product name must be at least 3 characters')
    .isLength({ max: 100 }).withMessage('Product name cannot exceed 100 characters'),

  body('category')
    .notEmpty().withMessage('Category is required')
    .isLength({ min: 3 }).withMessage('Category must be at least 3 characters'),

  body('price')
    .notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number')
    .isFloat({ min: 0 }).withMessage('Price cannot be negative'),

  body('quantity')
    .notEmpty().withMessage('Quantity is required')
    .isNumeric().withMessage('Quantity must be a number')
    .isInt({ min: 0 }).withMessage('Quantity cannot be negative'),
];

export default productCreateValidator
