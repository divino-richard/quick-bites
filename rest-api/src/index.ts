import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dbConnect from './config/db';
import authRouter from './routes/auth.router';
import * as dotenv from 'dotenv';
import merchantRoute from './routes/merchant.route';
import { authorize } from './middleware/auth.middleware';
import { User } from './types/user.types';
import mainRouter from './routes/main.route';
import { ROOT_DIRECTORY } from '../_dirname';
import path from 'path';
import userRouter from './routes/user.router';
import foodMenuRouter from './routes/foodMenu.router';

dotenv.config();

const app = express(); 
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

declare module 'Express' {
    interface Request {
        userData?: User;
    }
}

app.use('/uploads/', express.static(path.join(ROOT_DIRECTORY, '/src/uploads/')));

app.use("/auth", authRouter);
app.use('/api', mainRouter);

mainRouter.use('/merchant', authorize(['merchant']), merchantRoute);
mainRouter.use('/user', authorize(['merchant', 'rider', 'customer']), userRouter);
mainRouter.use('/foodMenu', authorize(['merchant', 'customer', 'admin']), foodMenuRouter);

dbConnect();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
