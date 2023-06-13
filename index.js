import { dbConnection } from "./db.js";
import  express  from "express";
import cors from "cors"
import dotenv from "dotenv"
import { userRouter } from "./Routers/user.js";
import { notesRouter } from "./Routers/notes.js";
import { isAuthenicated } from "./Controllers/auth.js";

// Config
dotenv.config();

// init
const app = express()
const PORT = process.env.PORT
// middleware
app.use(express.json())
app.use(cors())
// db connection
dbConnection()

// Routers
app.use("/api/user",userRouter)
app.use("/api/notes",isAuthenicated,notesRouter)
// server running
app.listen(PORT,()=>console.log(`Server running in ${PORT}`))