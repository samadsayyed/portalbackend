import { Manufacturer } from "../Models/Manufacturer.js"
import { Transporters } from "../Models/Transporters.js"
import { manufacturerMessage } from "../Models/manufacturerMessage.js"
import { generateRandomCode } from "../utils/randomCode.js"
import { sendToken } from "../utils/sendToken.js"
import bcrypt from "bcrypt"

export const Register = async (req, res) => {

    const { name, email, number, password } = req.body
    let manufacturer = await Manufacturer.findOne({ email })
    if (manufacturer) {
        return res.json({
            success: false,
            message: "user already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10)
    manufacturer = await Manufacturer.create({
        name, number, email, password:hashedPassword
    })
    sendToken(res,manufacturer)
    res.status(201).json({
        success: true,
        message: "User Created"
    })
}


export const Login = async(req,res) => {
const {email,password} = req.body
const manufacturer = await Manufacturer.findOne({email}).select("+password")
if(!manufacturer){
    return res.status(400).json({
        success:true,
        message:"Invalid username or password"
    }) 
}
const isMatch = await bcrypt.compare(password,manufacturer.password)
if(!isMatch){
    return res.status(400).json({
        success:false,
        message:"Invalid username or password"
    })
}
sendToken(res,manufacturer)
res.status(200).json({
    success:true,
    message:"Logged in as Manufacturer Successfully"
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

export const sendMessage = async(req,res) =>{
    console.log(req.params.id);
    const {to,adress,quantity,from} = req.body
    const message = await manufacturerMessage.create({to,adress,quantity,from,transporter:req.params.id})
    res.status(201).json({
        success:true,
        message:"Message sent"
    })
}


export const getAllTransporter = async(req,res)=>{
    const users = await Transporters.find({})
    res.status(200).json({
        success:true,
        users
    })
}