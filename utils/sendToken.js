import jwt from "jsonwebtoken"

export const sendToken = (res,user) =>{
    const token = jwt.sign({_id:user._id},process.env.Secret)
    res.cookie("token",token,{
        maxAge:process.env.Token_expire*1000*60*60*24
    })
}