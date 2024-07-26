const mongoose=require('mongoose')


const bannerSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    moreDetails:{
        type:String,
        required:true
    },
    postedDate:{
        type:Date,
        default:new Date(),
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'unpublished'
    }
})


module.exports=mongoose.model('banner',bannerSchema)