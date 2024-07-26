const mongoose=require('mongoose')


const serviceSchema=mongoose.Schema({
    img:{
        type:String,
        required:true
    },
    serviceName:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    moreDes:{
        type:String,
        required:true
    },
    createDate:{
        type:Date,
        default:new Date(),
        required:true

    },
    status:{
        type:String,
        default:'unpublished',
        required:true
    }

})


module.exports=mongoose.model('service',serviceSchema)