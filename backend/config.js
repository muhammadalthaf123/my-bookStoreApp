import dotenv from 'dotenv';
dotenv.config();

export const mongoDBURL = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 5656;
