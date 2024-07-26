const router=require('express').Router()
const regc=require('../controllers/regcontroller')
const bannerc=require('../controllers/bannercontroller')
const servicec=require('../controllers/servicescontroller')
const testimonialc=require('../controllers/testimonialcontroller')
const queryc=require('../controllers/querycontroller')
const upload=require('../middleware/multer')






router.get('/testiomnialform',testimonialc.testimonialform)
router.post('/testiomnialform',upload.single('img'),testimonialc.testimonialformpost)









module.exports=router