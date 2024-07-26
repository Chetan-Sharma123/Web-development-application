const router=require('express').Router()
const bannerTable=require('../models/banner')
const serviceTable=require('../models/service')
const testmnoialTable=require('../models/testmnoial')
const queryc=require('../controllers/querycontroller')

router.get('/',async(req,res)=>{
    const data=await bannerTable.findOne({status:'published'})
    const servicedata=await serviceTable.find({status:'published'})
    const testdata=await testmnoialTable.find({status:'published'})
    res.render('index.ejs',{data,servicedata,testdata})
})
router.post('/',queryc.querymanagement)


router.get('/moredeatails',async(req,res)=>{
    const data=await bannerTable.findOne({status:'published'})
    res.render('moredeatails.ejs',{data})
})


router.get('/servicemoredeatails/:serviceId',async(req,res)=>{
    const id=req.params.serviceId
    const servicemoredata=await serviceTable.findById(id)
    res.render('serviecdesc.ejs',{servicemoredata})
})




module.exports=router