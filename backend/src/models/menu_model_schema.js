import mongoose from "mongoose";

export const menuSchema=new mongoose.Schema({
    day:{
        type:String,
        required:true,
    },
    time:{
        type:Number,
        required:true,
    },
    items:{
        type:[String],
        required:true,
    }

});

export const menuModel=mongoose.model("meal",menuSchema);