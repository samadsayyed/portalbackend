import express from "express"
import { Login, Logout, Register, getallmanufacturer, sendReply, showMessage } from "../controllers/Transporters.js"
import { isAuthenticated } from "../middlewares/authTrans.js"
const router = express.Router()

router.post("/register",Register)
router.post("/login",Login)
router.get("/logout",isAuthenticated,Logout)

router.get("/getallmanufacturer",isAuthenticated,getallmanufacturer)

router.post("/stm/:id",isAuthenticated,sendReply)
router.get("/showmessage/:id",isAuthenticated,showMessage)
// router.get("/getAllTransporter",isAuthenticated,getAllTransporter)

export default router