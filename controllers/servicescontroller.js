const serviceTable=require('../models/service')

exports.servicepage=async(req,res)=>{
    let message=''
    const username=req.session.name
    const delmessage=req.params.message
    const data=await serviceTable.find()
    const allrecords=await serviceTable.find().count()
    const published=await serviceTable.find({status:'published'}).count()
    const unpublished=await serviceTable.find({status:'unpublished'}).count()
    res.render('admin/service.ejs',{username,message,data,allrecords,published,unpublished,delmessage})
}


exports.serviceform=(req,res)=>{
    let message=''
    const username=req.session.name
    res.render('admin/serviceform.ejs',{username,message})
}

exports.serviceformpost=(req,res)=>{
    let message=''
    const username=req.session.name
    
    
    try{
        const{servicename,desc,moredesc}=req.body
        const filename=req.file.filename
        if(!servicename){
            throw new Error("servicename could not blanke !!!!")
        }
        else if(!desc){
            throw new Error("Descriptions could not blanke !!!!")

        }else if(!moredesc){
            throw new Error("MoreDescriptions could not blanke !!!!")

        }
        else if(!filename){
            throw new Error("image could not blanke !!!!")

        }
        message='Service Add is Successfully'
      const servicedata=new serviceTable({serviceName:servicename,desc:desc,moreDes:moredesc,img:filename})
      servicedata.save()

    
    }catch(error){
          message= error.message
        
        
    }
    res.render('admin/serviceform.ejs',{username,message})
   
    
}

exports.servicestatusupdate=async(req,res)=>{
    const currenservestatus=req.params.status
    const id=req.params.id
   let status=null
   if(currenservestatus=='unpublished'){
    status='published'
   }else{
    status='unpublished'
   }
   await serviceTable.findByIdAndUpdate(id,{status:status})
res.redirect('/admin/servicemanagement/message')
    

}
exports.servicedelete=async(req,res)=>{
    const id=req.params.id
    console.log(id)
    await serviceTable.findByIdAndDelete(id)
    res.redirect('/admin/servicemanagement/Detete has been successfully')
    
}

exports.serviceupdate=async(req,res)=>{
    const username=req.session.name
    const id=req.params.id
    const data=await serviceTable.findById(id)
    console.log(data)
    res.render('admin/updateservice.ejs',{username,data})
}

exports.serviceupdatepost=async(req,res)=>{
    const id=req.params.id
    const{servicename,desc,moredes}=req.body
    if(req.file){
    const filename=req.file.filename
    console.log(filename)
    await serviceTable.findByIdAndUpdate(id,{img:filename,serviceName:servicename,desc:desc,moreDes:moredes})
    }else{
        await serviceTable.findByIdAndUpdate(id,{serviceName:servicename,desc:desc,moreDes:moredes})
    }
    res.redirect('/admin/servicemanagement/message')

}