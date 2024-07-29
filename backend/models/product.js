import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter the Product Name"],
        maxLength:[200,"Product Name cannot exceed 200 charaters"],
    },
    price:{
        type:Number,
        required:[true,"Please Enter the Product Price"],
        maxLength:[5,"Product Price cannot exceed 5 digits"],
    },
    description:{
        type:String,
        required:[true,"Please Enter the Product Description"],
    },
    ratings:{
        type:Number,
        default:0,
    },
    images:[
        {
         public_id:{
            type:String,
            required:true,
         },
         url:{
            type:String,
            required:true,
         },
    },
],
category:{
    type:String,
    required:true,
    enum:{
        values:[
            "Electronics",
            "Cameras",
            "Laptops",
            "Accessories",
            "Headphones",
            "Food",
            "Books",
            "Sports",
            "Outdoor",
            "Home",
        ],
        messages:"Please select Category",
    },
},
seller:{
    type:String,
    required:[true,"Please Enter Product Seller"],
},
stock:{
    type:Number,
    required:[true,"Please Enter Product Stock"],
},
numOfReviews:{
    type:Number,
    default:0,
},
reviews:[
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
        },
        rating:{
            type:Number,
            required:true,
        },
        comment:{
            type:String,
            required:true,
        },
    },
],
user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
},
},
{timestamp:true}
);

export default mongoose.model("Product",productSchema);