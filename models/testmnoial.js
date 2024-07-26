const mongoose=require('mongoose')


const testimonialSchema=mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
testimonials:{
    type:String,
    required:true
},
createDate:{
    type:Date,
    default:new Date(),
    required:true
},
img:{
    type:String,
    required:true
},
status:{
    type:String,
    default:'unpublished',
    required:true

}

})
module.exports=mongoose.model('Testimonial',testimonialSchema)