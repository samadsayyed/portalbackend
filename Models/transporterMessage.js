import mongoose from "mongoose";

const schema = new mongoose.Schema({
    orderId:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

export const TransporterMesssage = mongoose.model("TransporterMessage",schema)