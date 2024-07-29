import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";
import router from "./routes/products.js";
import errorMiddleware from "./middlewares/errors.js";
import authRoutes from './routes/auth.js'
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/order.js"
import paymentRoutes from "./routes/payment.js"

import path from "path"
import { fileURLToPath } from "url";
const _filename=fileURLToPath(import.meta.url);
const _dirname=path.dirname(_filename)

const app=express();

//Handle uncaught exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting Down the Server due to Uncaught Exceptions");
    
        process.exit(1);
    
});
if(process.env.NODE_ENV!=="PRODUCTION"){
dotenv.config({path:"backend/config/config.env"});
}
//connecting to database
connectDatabase();

//importing routes
app.use(express.json({
    limit:"10mb",
    verify:(req,res,buf)=>{
        req.rawBody=buf.toString()
    }
}));

app.use(cookieParser());

app.use("/api/v1",router);
app.use("/api/v1",authRoutes);
app.use("/api/v1/",orderRoutes);
app.use("/api/v1/",paymentRoutes);

if(process.env.NODE_ENV==="PRODUCTION"){
    app.use(express.static(path.join(_dirname,"../frontend/build")));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(_dirname,"../frontend/build/index.html"))
    })
}

//using errorHandler
app.use(errorMiddleware)// errors


const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

//Handle unhandled Promise ejections
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting Down the Server due to Unhandled Promise Ejection");
    server.close(()=>{
        process.exit(1);
    });
});