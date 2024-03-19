import { check } from 'express-validator';

export const validateFoodMenu = [
    check('name')
        .exists().withMessage('Food menu name is required')
        .notEmpty().withMessage('Food menu name is required')
        .isString().withMessage('Invalid food menu name'),
    check('description')   
        .exists().withMessage('Food menu description is required')
        .notEmpty().withMessage('Food menu description is required')
        .isString().withMessage('Invalid food menu description'),
    check('price')   
        .exists().withMessage('Food menu price is required')
        .notEmpty().withMessage('Food menu price is required')
        .isString().withMessage('Invalid food menu price'),
    check('category')   
        .exists().withMessage('Food menu category is required')
        .notEmpty().withMessage('Food menu category is required')
        .isString().withMessage('Invalid food menu category'),
]