
//requires
const express= require("express")
const morgan = require ("morgan")
const {connectionDatabase} = require("./config/db")
const logger = require("./middlewere/loger")

//connection with data base

const dotenv = require("dotenv")
dotenv.config()
connectionDatabase()

//middelwere
const app = express()
app.use(express.json());
app.use(logger)




//route
app.use("/api/auth",require ("./routers/auth"));
app.use("/api/user",require("./routers/users"))

//err handling

app.all("*",(req,res,next)=>{
    next(new Apierror (`can't find this route ${req.originalUrl}`,400))
})

//global handling midlle were
app.use((err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.status = err.status || "error"
    
        res.status(err.statusCode).json({
            statusCode:err.statusCode,
            message:err.message,
            err:err,
            stack:err.stack
        })
})



//server
 const PORT = process.env.PORT||2024
 app.listen(PORT , ()=>  console.log( `server is running on port ${PORT}`))


