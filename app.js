import express from "express"
import { config } from "dotenv"
import ManufacturerRouter from "./routes/Manufacturer.js"
import TransportersRouter from "./routes/Transporters.js"
import cookieParser from "cookie-parser"
import cors from "cors"

config({path:"./config/config.env"})

export const app = express()
app.use(cors({
  origin: process.env.Frontend, // Replace with your allowed origin(s),
  credentials: true,
}));
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/manufacturer",ManufacturerRouter)
app.use("/api/v1/transporter",TransportersRouter)

app.get("/",(req,res)=>{
    res.send("hello")
})