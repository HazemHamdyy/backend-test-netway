import { body } from 'express-validator';


const productUpdateValidator = [
  body('name')
    .optional() // Make it optional since the product name might not change
    .isLength({ min: 3 }).withMessage('Product name must be at least 3 characters long')
    .isLength({ max: 100 }).withMessage('Product name must not exceed 100 characters'),

    body('category')
    .optional() // Make it optional
    .isLength({ min: 3 }).withMessage('Category must be at least 3 characters long')
    .isLength({ max: 50 }).withMessage('Category must not exceed 50 characters'),

  body('price')
    .optional() // Make it optional
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

  body('quantity')
    .optional() // Make it optional
    .isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
];

export default productUpdateValidator;

