//class property
class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);//parent constructor
        this.statusCode=statusCode;

        //optinal used for dev elopmental errors //create stack property
        Error.captureStackTrace(this,this.constructor);
    }
}
export default ErrorHandler;