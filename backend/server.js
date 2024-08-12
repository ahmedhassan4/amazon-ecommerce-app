import mongoose, { Schema } from "mongoose";
import app from "./app.js";

import dotenv from "dotenv"
dotenv.config({path: './config.env'})

const DB = process.env.DATABASE.replace('<PASSWORD>' , process.env.DATABASE_PASSWORD)

mongoose.connect(DB).then(()=>{
    console.log('DB connection successfull!')
}).catch(()=>console.log('DB Error'))

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})
