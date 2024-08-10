// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./route";
import cors from 'cors';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
dotenv.config({ path: envFile });

const app: Express = express();
app.use(cors());
const port = process.env.PORT || 3000;

// This will disable CORS for all routes

app.use('/api', router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});