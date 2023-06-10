import mongoose from "mongoose";
import { generateRandomCode } from "../utils/randomCode.js"

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
    },
    messages:[
        {
            orderId: {
                type: String,
                default: generateRandomCode(5)
            },
            to: String,
            from: String,
            quantity: Number,
            adress: String,
            manufacturer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Manufacturer",
            }
        }
    ]
})

export const Transporters = mongoose.model("Transporters",schema)