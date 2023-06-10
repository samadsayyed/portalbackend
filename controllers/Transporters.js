import { Manufacturer } from "../Models/Manufacturer.js"
import { Transporters } from "../Models/Transporters.js"
import { sendToken } from "../utils/sendToken.js"
import bcrypt from "bcrypt"

export const Register = async (req, res) => {
try {
    const { name, email, number, password } = req.body
    let transporters = await Transporters.findOne({ email })
    if (transporters) {
        return res.json({
            message: "user already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10)
    transporters = await Transporters.create({
        name, number, email, password:hashedPassword
    })
    sendToken(res,Transporters)
    res.status(201).json({
        message: "Transporter Created"
    })
} catch (error) {
    res.status(500).json({
        message:"Internal server error"
      })
}
}


export const Login = async(req,res) => {
try {
    const {email,password} = req.body
const transporters = await Transporters.findOne({email}).select("+password")
if(!transporters){
    return res.status(400).json({
        message:"Invalid username or password"
    }) 
}
const isMatch = await bcrypt.compare(password,transporters.password)
if(!isMatch){
    return res.status(400).json({
        message:"Invalid username or password"
    })
}
sendToken(res,transporters)
res.status(200).json({
    message:"Logged in as Transporter successfully"
})
} catch (error) {
    res.status(500).json({
        message:"Internal server error"
      })
}
}


export const Logout=(req,res)=>{
    res.cookie("token","",{
        expires:new Date(Date.now())
    }).json({
        message:"Logged out successfully"
    })
}


export const sendReply = async(req,res)=>{
    try {
        const {orderId,price} = req.body
    let manufacturer = await Manufacturer.findById(req.params.id)
    manufacturer.reply.push({orderId,price,Transporter:req.user._id})
    manufacturer.save()
    res.status(201).json({
        message:"Reply sent"
    })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
          })
    }
}

export const getallmanufacturer = async(req,res)=>{
    try {
        const manufacturer = await Manufacturer.find({})
    res.status(200).json({
        manufacturer
    })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
          })
    }
}

export const showMessage =async (req,res) =>{
    res.status(200).json({
        messages:req.user.messages
    })
}