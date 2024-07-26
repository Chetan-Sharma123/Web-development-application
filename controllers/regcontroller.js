const regTable=require('../models/reg')


exports.loginform=(req,res)=>{
    res.render('admin/adminlogin.ejs',{message:''})

}


exports.logincheck=async(req,res)=>{
    try{
    const{username,password}=req.body
    if(!username){
        throw new Error('username should not be blank')
    }
    if(!password){
        throw new Error('password should not be blank')
    }
  
    const data=await regTable.findOne({username:username})
    if(data!==null){
        if(data.password==password){
            req.session.isAuth=true
            req.session.name=data.username
            res.redirect('/admin/dashboard')
        }else{
            res.render('admin/adminlogin.ejs',{message:'Wrong password'})
        }

    }else{
        res.render('admin/adminlogin.ejs',{message:'Wrong Username'})
    }
    }catch(error){
        res.render('admin/adminlogin.ejs',{message:error.message})
    }
}

exports.logout=(req,res)=>{
    req.session.destroy()
    res.redirect('/admin/')

}