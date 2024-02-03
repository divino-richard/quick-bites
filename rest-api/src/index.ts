import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dbConnect from './config/db';
import authRouter from './routes/auth.router';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express(); 
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRouter)

dbConnect()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
