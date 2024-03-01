import { NextFunction, Request, Response } from "express";

export const authorize = (authorizedUser: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.userData) {
            throw new Error('Empty user data');
        }

        const userType  = req.userData?.userType;

        if(!authorizedUser.includes(userType)) {
            return res.status(403).send('Forbidden');
        }

        next();
    }
}
