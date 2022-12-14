import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const client = new Client({
  //heroku hosted database
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
