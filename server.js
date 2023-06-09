import { app } from "./app.js";
import { connectDB } from "./config/database.js";

connectDB()

app.listen(process.env.Port,()=>{
    console.log(`Listining on ${process.env.Port}`);
})