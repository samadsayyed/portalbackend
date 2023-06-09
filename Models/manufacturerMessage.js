import mongoose from "mongoose";
import { generateRandomCode } from "../utils/randomCode.js";

const schema = new mongoose.Schema({
    orderId: {
        type: String,
        default: generateRandomCode()
    },
    to: String,
    from: String,
    quantity: Number,
    adress: String,
    transporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transporters",
    }
})

export const manufacturerMessage = mongoose.model("manufacturerMessage",schema)