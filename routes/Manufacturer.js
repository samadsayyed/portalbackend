import express from "express"
import { Login, Logout, Register, getAllTransporter, sendMessage } from "../controllers/Manufacturer.js"
import { isAuthenticated } from "../middlewares/authManu.js"

const router = express.Router()

router.post("/register",Register)
router.post("/login",Login)
router.get("/logout",isAuthenticated,Logout)

router.post("/stt/:id",isAuthenticated,sendMessage)
router.get("/getAllTransporter",getAllTransporter)

export default router