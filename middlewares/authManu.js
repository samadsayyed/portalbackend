import jwt from "jsonwebtoken";
import { Manufacturer } from "../Models/Manufacturer.js";

export const isAuthenticated = async (req, res, next) => {
try {
  const { token } = req.cookies;
  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });
  const decoded = jwt.verify(token, process.env.Secret);
  req.user = await Manufacturer.findById(decoded._id);
  if(!req.user){
    return res.status(404).json({
      success:false,
      message:"Invalid request"
    })
  }
  next();
} catch (error) {
  res.status(500).json({
    success:false,
    message:"Internal server error"
  })
}
};