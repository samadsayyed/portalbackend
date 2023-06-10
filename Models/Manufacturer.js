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
    },
    reply:[
        {
            orderId:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            Transporter: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Transporter",
            }
        }
    ]
})

export const Manufacturer = mongoose.model("Manufacturer",schema)