import mongoose from "mongoose";

export function dbConnection()
{
    const params = {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    }

try {
    mongoose.connect("mongodb://127.0.0.1:27017/interview", params)
    console.log("Database connected successfully")
} catch (error) {
    console.log("error in Database",error)
}
}