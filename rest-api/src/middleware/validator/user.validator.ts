import { check } from "express-validator";

export const validateRegistration = [
    check('firstName')
        .exists().withMessage("First name is required")
        .isString().withMessage("Invalid first name"),
    check('lastName')
        .exists().withMessage("Last name is required")
        .isString().withMessage("Invalid first name"),
    check('phoneNumber')
        .exists().withMessage("Phone number is required")
        .isString().withMessage("Invalid phone number"),
    check('address')
        .exists().withMessage("Address is required")
        .isString().withMessage("Invalid address"),
    check('userType')
        .exists().withMessage("User type is required"),
    check('email')
        .exists().withMessage("Email is required")
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
        })
]

export const validateLogIn = [
    check('email')
        .exists().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),
    check('password')
        .exists().withMessage("Password is required")
        .isLength({min: 8}).withMessage("Password must be 8 characters long")
]
