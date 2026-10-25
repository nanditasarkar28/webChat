// const express=require(express);
import express from 'express';

import dotenv from 'dotenv';
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/meassageRoute.js";
import cookieParser from "cookie-parser";
dotenv.config({});
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/message", messageRoute);

app.listen(PORT,()=>{
    connectDB();
    console.log(`server is running on port ${PORT}`);
})

