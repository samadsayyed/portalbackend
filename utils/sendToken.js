import jwt from "jsonwebtoken"

export const sendToken = (res,user) =>{
    const token = jwt.sign({_id:user._id},process.env.Secret)
    console.log(process.env.NODE_ENV);
    console.log(process.env.NODE_ENV === "Development");
    res.cookie("token",token,{
        httpOnly:true,
        maxAge:process.env.Token_expire*1000*60*60*24,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
}