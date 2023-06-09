import mongoose from "mongoose"

export const connectDB = () => {
    mongoose.connect("mongodb://127.0.0.1",
        { dbName: "portal" })
        .then(() => {
            console.log("connected");
        }).catch(
            (e) => console.log(e, "error")
        )
}