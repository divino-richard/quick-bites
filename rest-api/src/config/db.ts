import mongoose from "mongoose";

export default function dbConnect() {
    mongoose.connect(process.env.MONGODB_URI ?? '');
    const db = mongoose.connection;

    db.on('connected', () => console.log('Connected to the database'));
    db.on('error', (error) => console.error('Error connecting to the database:', error));
    db.on('disconnected', () => console.log('DB disconnected'));

    return db;
}
