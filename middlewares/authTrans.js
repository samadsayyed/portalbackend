import jwt from "jsonwebtoken";
import { Transporters } from "../Models/Transporters.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });

  const decoded = jwt.verify(token, process.env.Secret);

  req.user = await Transporters.findById(decoded._id);
  console.log(req.user);
  next();
};