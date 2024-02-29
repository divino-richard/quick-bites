import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const authorize = (allowedRole: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.headers.authorization) {
            return res.status(401).send('Unauthorized');
        }
        const token = req.headers.authorization.split(" ")[1];
        if(!token) {
            return res.status(401).send('Unauthorized');
        }
        console.log(process.env.JWT_PRIVATE_KEY)

        if(!process.env.JWT_PRIVATE_KEY) {
            throw new Error('Failed to get jwt private key')
        }
        jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, payload) => {
            if(error) {
                return res.status(401).send('Unauthorized');
            }

            console.log(payload)
        })

        next()
    }
}