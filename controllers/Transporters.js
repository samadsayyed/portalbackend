import { Transporters } from "../Models/Transporters.js"
import { TransporterMesssage } from "../Models/transporterMessage.js"
import { sendToken } from "../utils/sendToken.js"
import bcrypt from "bcrypt"

export const Register = async (req, res) => {

    const { name, email, number, password } = req.body
    let transporters = await Transporters.findOne({ email })
    if (transporters) {
        return res.json({
            success: false,
            message: "user already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10)
    transporters = await Transporters.create({
        name, number, email, password:hashedPassword
    })
    sendToken(res,Transporters)
    res.status(201).json({
        success: true,
        message: "Transporter Created"
    })
}


export const Login = async(req,res) => {
const {email,password} = req.body
const transporters = await Transporters.findOne({email}).select("+password")
if(!transporters){
    return res.status(400).json({
        success:true,
        message:"Invalid username or password"
    }) 
}
const isMatch = await bcrypt.compare(password,transporters.password)
if(!isMatch){
    return res.status(400).json({
        success:false,
        message:"Invalid username or password"
    })
}
sendToken(res,transporters)
res.status(200).json({
    success:true,
    message:"Logged in as Transporter successfully"
})
}


export const Logout= async(req,res)=>{
    res.cookie("token","",{
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"Logged out successfully"
    })
}


export const sendMessage = async(req,res)=>{
    const {price} = req.body
    const msg = await TransporterMesssage.create({orderId:req.params.id,price})
    res.status(201).json({
        success:true,
        msg
    })
}