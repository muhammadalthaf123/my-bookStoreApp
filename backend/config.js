import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export const mongoDBURL = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 5656;
