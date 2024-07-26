const queryTable=require('../models/query')
const nodemailer=require('nodemailer')
const env=require('dotenv').config()
exports.querymanagement=(req,res)=>{
    try{
    const{name,email,query}=req.body
    const querydata=new queryTable({name:name,email:email,query:query})
    querydata.save()
    res.render('message.ejs')
    }catch(error){
        console.log(error.message)
    }
    
}

exports.querymanagementform=async(req,res)=>{
    const username=req.session.name
    const message=req.params.message
    const allquerydata=await queryTable.find()
    res.render('admin/querymanagement.ejs',{username,allquerydata,message})
}


exports.querydelete=async(req,res)=>{
    const id=req.params.querydelete
    await queryTable.findByIdAndDelete(id)
    res.redirect('/admin/querymanagement/delete has been successful')

    
}
exports.queryform=(req, res) => {
    let message=''
    const email=req.params.email
    const query=req.params.query
  const username = req.session.name;
  res.render("admin/queryform.ejs", { username,email,query,message });
}

exports.queryformpost=async(req, res) => {
    let message=''
  const { emailto, emailfrom, sub, emailbody } = req.body;
  const email=req.params.email
  const query=req.params.query
  const id=req.params.id
const username = req.session.name;
  const transporter =   nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAILUSER,
      pass: process.env.EMAILPASSWORD,
    },
  });
  await transporter.sendMail({
    from: emailfrom, // sender address
    to: emailto, // list of receivers
    subject: "Hello ✔", // Subject line
    text: sub, // plain text body
    text: emailbody, // html body
  });
  await queryTable.findByIdAndUpdate(id,{status:'Replied'})
 message='Email sent successfully'
res.render("admin/queryform.ejs", { username,email,query ,message});
}