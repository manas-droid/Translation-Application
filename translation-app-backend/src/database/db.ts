import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();



export const client = new MongoClient(process.env.DATABASE_URL!);
export const db = client.db(process.env.DATABASE_NAME);