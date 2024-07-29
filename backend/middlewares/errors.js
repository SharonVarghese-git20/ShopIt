import ErrorHandler from "../utils/errorHandler.js";


export default (err,req,res,next)=>{
    let error ={
        statusCode:err?.statusCode||500,
        message:err?.message||'Internal Server Error',
    };

    //invalid mongoose id error
       if(err.name==='CastError'){
        const message=`Resource not Found.Invalid ${err?.path}`
        error=new ErrorHandler(message,404)
       }

     //Handle Validation Error
     if(err.name==='ValidationError'){
        const message=Object.values(err.errors).map(value=>value.message);
        error=new ErrorHandler(message,400);
     }
     
     // mongoose duplicate key error
     if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} is entered`
        error=new ErrorHandler(message,400)
       }

     //wrong JWT Error
     if(err.name==='JsonWebTokenError'){
        const message=`Json Web Token invalid. Try Again! `
        error=new ErrorHandler(message,400)
       }  
       
     //wrong JWT Error
     if(err.name==='TokenExpiredError'){
        const message=`Json Web Token expired. Try Again! `
        error=new ErrorHandler(message,400)
       }  

    if(process.env.NODE_ENV=='DEVELOPMENT'){
        res.status(error.statusCode).json({
            message:error.message,
            error:err,
            stack:err?.stack,
        });
    }
    if(process.env.NODE_ENV=='PRODUCTION'){
    res.status(error.statusCode).json({
        message:error.message
    });
}
}