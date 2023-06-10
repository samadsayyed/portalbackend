import mongoose from "mongoose"

export const connectDB = () => {
    mongoose.connect(process.env.Mongo_Url,
        { dbName: "portal" })
        .then(() => {
            console.log("connected");
        }).catch(
            (e) => console.log(e, "error")
        )
}