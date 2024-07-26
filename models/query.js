const mongoose=require('mongoose')

const querySchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    query:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'no-reply',
        required:true
    },
    date:{
        type:Date,
        default:Date(),
        required:true
    }
})



module.exports=mongoose.model('query',querySchema)