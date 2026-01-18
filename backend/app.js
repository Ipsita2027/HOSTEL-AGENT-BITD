import express from "express";
import {queryRouter} from "./src/routes/get_meal_query.js";
import { connectDB } from "./src/config/mongo.config.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config("./.env");

const PORT=4000||process.env.PORT;

const app=express();

const allowedOrigins = [
  process.env.FRONT_END_URL,
];


app.use(cors({
    origin:allowedOrigins,
    credentials:true
}));
app.use(express.json());
app.use("/",queryRouter);


app.listen(PORT,()=>{
    try{
        connectDB();
        console.log(`Server running at http://localhost:${PORT}`);
    }
    catch(e){
        process.abort();
    }
    
});