import express from 'express';
import dotenv from 'dotenv';
import Database from './config/database.js';
dotenv.config();
import cors from 'cors';
import UserRouter from './router/userRouter.js';
import User from './model/AuthModel.js';
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';
import PropertyRouter from './router/propertyRouter.js';
import ContactRouter from './router/contactRouter.js';
import path from 'path';
import carRouter from './router/carRouter.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: ["https://kenepaapartment.com"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(cookieParser())

app.use("/uploads", express.static("uploads"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use("/user",UserRouter)
app.use("/property",PropertyRouter)
app.use("/contact",ContactRouter)
app.use("/car",carRouter)


Database();
User();

app.get('/', (req, res) => {
  res.send('Hello, World! server is running');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})