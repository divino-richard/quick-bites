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

