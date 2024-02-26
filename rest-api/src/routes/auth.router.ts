import express, { Request, Response } from "express"; 
import { login, register } from "../controller/user.controller";
import { 
    validateLogIn, 
    validateMerchantRegistration, 
    validateRegistration 
} from "../middleware/validator/user.validator";
import { validationResult } from "express-validator";

const authRouter = express.Router();

authRouter.post('/register', validateRegistration, async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg})
    }
    register(req, res);
})

authRouter.post('/login', validateLogIn, async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg})
    }
    login(req, res);
})

authRouter.post('/register/merchant', validateMerchantRegistration, async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg})
    }
    register(req, res);
})

export default authRouter;
