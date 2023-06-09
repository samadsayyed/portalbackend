import express from "express"
import { Login, Logout, Register, sendMessage } from "../controllers/Transporters.js"
import { isAuthenticated } from "../middlewares/authTrans.js"

const router = express.Router()

router.post("/register",Register)
router.post("/login",Login)
router.get("/logout",isAuthenticated,Logout)

router.post("/stm/:id",isAuthenticated,sendMessage)

export default router