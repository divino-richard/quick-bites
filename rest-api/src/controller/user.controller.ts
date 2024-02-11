import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../model/User"
import {User, UserCredentials} from "../types/user.types";

export async function register(req: Request, res: Response) {
    try {
        const saltRounds = 11;
        const body: User = req.body;

        const foundUser = await UserModel.findOne({ email: body.email });
        if(foundUser) {
            return res.status(400).json({message: "User already exist"})
        }

        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        const createdUser = await UserModel.create({
            ...body, 
            password: hashedPassword
        });
        const responseData = createdUser.toObject({virtuals: true});

        delete responseData.password;
        
        res.status(201).json({ user: responseData });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Please try again later"
        })
        console.log("ERROR: ", error);
    }
}

export async function login(req: Request, res: Response) {
    try {
        const body: UserCredentials = req.body;

        const foundUser = await UserModel.findOne({email: body.email});
        if(!foundUser) {
            return res.status(400).json({message: "Account not exist"});
        }

        if(!foundUser.password) {
            throw new Error('Password is not found');
        }

        const passwordCorrect = await bcrypt.compare(body.password, foundUser.password)
        if(!passwordCorrect) {
            return res.status(400).json({message: "Incorrect password"})
        }

        const userData = foundUser.toObject({virtuals: true})
        delete userData.password;

        if(!process.env.JWT_PRIVATE_KEY) {
            throw new Error('Failed to get jwt private key')
        }

        jwt.sign(
            userData, 
            process.env.JWT_PRIVATE_KEY, 
            { algorithm: 'HS256' }, 
            function(error, token) {
                if(error) throw new Error('JWT sign error');
                
                res.status(200).json({userData, token})
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Please try again later."
        })
        console.log("Error: ", error)
    }
}
