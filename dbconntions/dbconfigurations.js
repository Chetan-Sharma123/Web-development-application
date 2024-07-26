const mongoose= require('mongoose')
require('dotenv').config
mongoose.connect(`${process.env.DBURL}/${process.env.DBNAME}`).then(()=>{
    console.log('Connected to webbaseapplicationproject DB')
}).catch((error)=>{
    console.log(error.message)
})