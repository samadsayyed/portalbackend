import { Manufacturer } from "../Models/Manufacturer.js"
import { Transporters } from "../Models/Transporters.js"
import { sendToken } from "../utils/sendToken.js"
import bcrypt from "bcrypt"

export const Register = async (req, res) => {
    try {
        const { name, email, number, password } = req.body
        let manufacturer = await Manufacturer.findOne({ email })
        if (manufacturer) {
            return res.status(400).json({
                message: "user already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        manufacturer = await Manufacturer.create({
            name, number, email, password: hashedPassword
        })
        sendToken(res, manufacturer)
        res.status(201).json({
            message: "User Created"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const manufacturer = await Manufacturer.findOne({ email }).select("+password")
        if (!manufacturer) {
            return res.status(400).json({
                message: "Invalid username or password"
            })
        }
        const isMatch = await bcrypt.compare(password, manufacturer.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid username or password"
            })
        }
        sendToken(res, manufacturer)
        res.status(200).json({
            message: "Logged in as Manufacturer Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}


export const Logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Develpoment" ? false : true
    }).json({
        message: "Logged out successfully"
    })
}

export const sendMessage = async (req, res) => {
    try {
        const { to, adress, quantity, from } = req.body
        let transporter = await Transporters.findById(req.params.id)
        if (!transporter) {
            return res.status(404).json({
                message: "Transporter not found"
            })
        }
        transporter.messages.push({ to, adress, quantity, from })
        transporter.save()
        res.status(201).json({
            message: "Message sent",
            by: req.user.name,
            to: transporter.name
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}


export const showReply = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({
                message: "Invalid request"
            })
        }
        let id = req.params.id

        res.status(200).json({
            messages: req.user.reply
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}


export const getAllTransporter = async (req, res) => {
    try {
        const users = await Transporters.find({})
        if (!users) {
            return res.status(404).json({
                message: "Invalid request"
            })
        }
        res.status(200).json({
            users
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}