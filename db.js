import mongoose from "mongoose";

export function dbConnection()
{
    const params = {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    }

try {
    mongoose.connect("mongodb+srv://praveenive:Praveen6@cluster0.4iggedc.mongodb.net/interview-app?retryWrites=true&w=majority", params)
    console.log("Database connected successfully")
} catch (error) {
    console.log("error in Database",error)
}
}