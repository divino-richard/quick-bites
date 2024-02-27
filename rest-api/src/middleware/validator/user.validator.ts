import { check } from "express-validator";

export const validateRegistration = [
    check('firstName')
        .exists().withMessage("First name is required")
        .notEmpty().withMessage("First name is required")
        .isString().withMessage("Invalid first name"),
    check('lastName')
        .exists().withMessage("Last name is required")
        .notEmpty().withMessage("Last name is required")
        .isString().withMessage("Invalid first name"),
    check('phoneNumber')
        .exists().withMessage("Phone number is required")
        .notEmpty().withMessage("Phone number is required")
        .isString().withMessage("Invalid phone number"),
    check('userType')
        .exists().withMessage("User type is required")
        .isString().withMessage("Invalid user type"),
    check('email')
        .exists().withMessage("Email is required")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),
    check('password')
        .custom((value) => {
            if (!value) {
                throw new Error('Password is required')
            }

            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=])[0-9a-zA-Z!@#$%^&*()-_+=]{8,}$/;
            const isPasswordValid = passwordRegex.test(value)

            if(!isPasswordValid) {
                throw new Error('Password must have atleast least 8 characters long, one digit, one lowercase letter, one uppercase letter, and one special characters !@#$%^&*()-_+=')
            }
            
            return true
        })
]

export const validateLogIn = [
    check('email')
        .exists().withMessage("Email is required")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),
    check('password')
        .exists().withMessage("Password is required")
        .notEmpty().withMessage("Password is required")
]

export const validateMerchantRegistration = [
    check('firstName')
        .exists().withMessage("First name is required")
        .notEmpty().withMessage("First name is required")
        .isString().withMessage("Invalid first name"),
    check('lastName')
        .exists().withMessage("Last name is required")
        .notEmpty().withMessage("Last name is required")
        .isString().withMessage("Invalid first name"),
    check('phoneNumber')
        .exists().withMessage("Phone number is required")
        .notEmpty().withMessage("Phone number is required")
        .isString().withMessage("Invalid phone number"),
    check('userType')
        .exists().withMessage("User type is required")
        .isString().withMessage("Invalid user type"),
    check('email')
        .exists().withMessage("Email is required")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),
    check('password')
        .custom((value) => {
            if (!value) {
                throw new Error('Password is required')
            }

            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=])[0-9a-zA-Z!@#$%^&*()-_+=]{8,}$/;
            const isPasswordValid = passwordRegex.test(value)

            if(!isPasswordValid) {
                throw new Error('Invalid Password')
            }
            
            return true
        }),
    check('businessName')
        .exists().withMessage('Business name is required')
        .notEmpty().withMessage('Business name is required')
        .isString().withMessage('Invalid business name'),
    check('businessType')
        .exists().withMessage('Business type is required')
        .notEmpty().withMessage('Business type is required')
        .isString().withMessage('Invalid business type'),
    check('registrationNumber')
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
    check('holderName')
        .exists().withMessage('Holder name is required')
        .notEmpty().withMessage('Holder name is required')
        .isString().withMessage('Invalid holder name'),
    check('accountNumber')
        .exists().withMessage('Account number is required')
        .notEmpty().withMessage('Account number is required')
        .isNumeric().withMessage('Invalid account number'),
    check('taxIdNumber')
        .exists().withMessage('Tax ID number is required')
        .notEmpty().withMessage('Tax ID number is required')
        .isNumeric().withMessage('Invalid tax ID number'),
]
