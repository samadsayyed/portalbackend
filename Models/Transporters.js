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
        default:"Transporter"
    }
})

export const Transporters = mongoose.model("Transporters",schema)