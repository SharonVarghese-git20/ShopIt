import mongoose from "mongoose";
import Product from "../models/product.js";
import products from "./data.js";

const seedProducts= async ()=>{
    try{
        await mongoose.connect("mongodb+srv://ShopIt:101010@cluster0.xxfcwwg.mongodb.net/shopit?retryWrites=true&w=majority&appName=Cluster0");

        await Product.deleteMany();
        console.log("Products Deleted");

        await Product.insertMany(products);
        console.log("Products Added");
        process.exit();

    }catch(error){
        console.log(error.message);
        process.exit();
    }
};
seedProducts();