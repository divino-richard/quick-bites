import { NextFunction, Request, Response } from "express"

export const authorize = (allowedRole: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.headers.authorization) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const token = req.headers.authorization.split(" ")[1];
        if(!token) {
            return res.status(401).json({message: "Unauthorized"})
        }

        

        next()
    }
}