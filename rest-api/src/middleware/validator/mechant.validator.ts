import { check } from "express-validator";

export const validateRegistrationCompletion = [
    check('businessName')
        .exists().withMessage('Business name is required')
        .notEmpty().withMessage('Business name is required')
        .isString().withMessage('Invalid business name'),
    check('businessType')
        .exists().withMessage('Business type is required')
        .notEmpty().withMessage('Business type is required')
        .isString().withMessage('Invalid business type'),
    check('businessRegistrationNumber')
        .exists().withMessage('Registration number is required')
        .notEmpty().withMessage('Registration number is required')
        .isNumeric().withMessage('Invalid registration num ber'),
    check('businessAddress')
        .exists().withMessage('Business address is required')
        .notEmpty().withMessage('Business address is required')
        .isString().withMessage('Invalid business address'),
    check('bankName')
        .exists().withMessage('Bank name is required')
        .notEmpty().withMessage('Bank name is required')
        .isString().withMessage('Invalid bank name'),
    check('bankHolderName')
        .exists().withMessage('Holder name is required')
        .notEmpty().withMessage('Holder name is required')
        .isString().withMessage('Invalid holder name'),
    check('bankAccountNumber')
        .exists().withMessage('Account number is required')
        .notEmpty().withMessage('Account number is required')
        .isNumeric().withMessage('Invalid account number'),
    check('taxIdNumber')
        .exists().withMessage('Tax ID number is required')
        .notEmpty().withMessage('Tax ID number is required')
        .isNumeric().withMessage('Invalid tax ID number'),
]
