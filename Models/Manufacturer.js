import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
    },
    number:Number,
    password:{
        type:String,
        select:false
    },
    role:{
        type:String,
        default:"Manufacturer"
    }
})

export const Manufacturer = mongoose.model("Manufacturer",schema)