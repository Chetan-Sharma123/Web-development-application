const express=require('express')
const app=express()
const env=require('dotenv').config()
app.use(express.urlencoded({extended:false}))
require('./dbconntions/dbconfigurations')
const session=require('express-session')
const adminRouter=require('./routers/adminRouter')
const userRouter=require('./routers/userRouter')
const homeRouter=require('./routers/home')






app.use(session({
    secret:process.env.SKey,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1*1000*60*60*24
    }
}))
app.use('/admin',adminRouter)
app.use('/users',userRouter)
app.use(homeRouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})