import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dbConnect from './config/db';
import authRouter from './routes/auth.router';
import * as dotenv from 'dotenv';
import { authorize } from './middleware/auth.middleware';
import { User } from './types/user.types';
import mainRouter from './routes/main.router';
import { ROOT_DIRECTORY } from '../_dirname';
import path from 'path';
import publicRouter from './routes/publicmenu.router';
import restaurantRouter from './routes/restaurant.router';
import menuRouter from './routes/menu.router';
import uploadRouter from './routes/upload.router';
import publicMenuRouter from './routes/publicmenu.router';

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

// public routes
app.use("/auth", authRouter);
app.use('/menus', publicMenuRouter);

// private routes
app.use('/api', mainRouter);
mainRouter.use('/restaurants', authorize(['merchant']), restaurantRouter);
mainRouter.use('/menus', menuRouter);
mainRouter.use('/uploads', uploadRouter);
 
dbConnect();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
