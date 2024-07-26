const testimonialsTable=require('../models/testmnoial')


exports.testimonialform=(req,res)=>{
    const username=req.session.name
    let message=''
    res.render('testionminalform',{username,message})
}

exports.testimonialformpost=(req,res)=>{
    let message=''
    try{
        const{name,email,Testimonial}=req.body
        const filename=req.file.filename

        if(!name){
            throw new Error("Name Could Not blank !!!")

        }else if(!email){
            throw new Error("Email Could Not blank  !!!")

        }else if(!Testimonial){
            throw new Error("Testimonial Could Not blank !!!")

        }
         else if(!req.file){
             throw new Error("Image  Could Not blank !!!")
         }
         const dataTest=new testimonialsTable({name:name,email:email,testimonials:Testimonial,img:filename})
         dataTest.save()
         message='Testimonial Successfully post'
    }catch(error){
        message=error.message
        res.render('testionminalform.ejs',{message})
    }
    res.redirect('/')

}


exports.testimonialpage=async(req,res)=>{
    const username=req.session.name
    const message=req.params.message
    const data=await testimonialsTable.find()
    const allrecords=await testimonialsTable.find().count()
    const published=await testimonialsTable.find({status:'published'}).count()
    const unpublished=await testimonialsTable.find({status:'unpublished'}).count()
    res.render("admin/testiomnial.ejs",{username,data,allrecords,published,unpublished,message})




}

exports.testimonialupdateStatus=async(req,res)=>{
    try{
    let currentStatus=req.params.status
    const id=req.params.testId
    let updateTestStatus=null
    
    
    if(currentStatus=='unpublished'){
        updateTestStatus='published'
    }else{
        updateTestStatus ='unpublished'
    }
    
    await testimonialsTable.findByIdAndUpdate(id,{status:updateTestStatus})
    res.redirect('/admin/testiomnialManagemant/message')

}catch(error){
    console.log(error.message)
}  
}


exports.testimonialdelete=async(req,res)=>{
    const id=req.params.testid
    await testimonialsTable.findByIdAndDelete(id)
    res.redirect('/admin/testiomnialManagemant/Deleted has been successfully')

   

}

exports.updateform=async(req,res)=>{
    const username=req.session.name
    const id=req.params.updateTestId
    const data=await testimonialsTable.findById(id)
    res.render('admin/updatetestform',{username,data})
    
}

exports.updateformpost=async(req,res)=>{
    const{name,email,test}=req.body
    const id=req.params.updateTestId
    if(req.file){
        const filename=req.file.filename
        await testimonialsTable.findByIdAndUpdate(id,{name:name,email:email,testimonials:test,img:filename})
    }else{
        await testimonialsTable.findByIdAndUpdate(id,{name:name,email:email,testimonials:test})
    }
    
    res.redirect('/admin/testiomnialManagemant/message')
}
