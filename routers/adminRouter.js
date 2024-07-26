const router = require('express').Router()
const regc = require('../controllers/regcontroller')
const bannerc = require('../controllers/bannercontroller')
const servicec = require('../controllers/servicescontroller')
const testimonialc = require('../controllers/testimonialcontroller')
const queryc = require('../controllers/querycontroller')
const handlelogin = require('../middleware/sessionCheck')
const upload = require('../middleware/multer')
const nodemailer = require('nodemailer')

// login management
router.get('/', regc.loginform).post('/', regc.logincheck)
router.get('/logout', regc.logout)

// banner management
router.get('/bannermangement/:message', handlelogin, bannerc.bannerpage)
router.get('/bannerform', handlelogin, bannerc.banneraddform).post('/bannerform', upload.single('img'), bannerc.bannerdata)
router.get('/updatestatus/:status/:id', bannerc.updateStatus)
router.get('/deletebanner/:id/:imgname',handlelogin,bannerc.deleted)
router.get('/updatebanner/:bannerId', bannerc.bannerupdate).post('/updatebanner/:bannerId',upload.single('img'),
    bannerc.bannerupdatepost
)

// service managemnt
router.get('/servicemanagement/:message',  servicec.servicepage)
router.get('/serviceform', servicec.serviceform)
router.post('/serviceform', upload.single('img'), servicec.serviceformpost)

router.get('/servicestatusupdate/:id/:status', servicec.servicestatusupdate)
router.get('/deleteservice/:id', handlelogin,servicec.servicedelete)
router.get('/updateservice/:id',handlelogin,servicec.serviceupdate).post('/updateservice/:id', upload.single('img'), servicec.serviceupdatepost)

router.get('/dashboard', handlelogin, (req, res) => {
  const username = req.session.name
  res.render('admin/deshboard.ejs', { username})
})
// tetiomonial management
router.get('/testiomnialManagemant/:message',handlelogin,testimonialc.testimonialpage)
router.get('/testupdatestatus/:testId/:status',handlelogin,testimonialc.testimonialupdateStatus)
router.get('/testdelete/:testid', testimonialc.testimonialdelete)
router.get('/updatetestform/:updateTestId',handlelogin, testimonialc.updateform).post('/updatetestform/:updateTestId',upload.single('img'),testimonialc.updateformpost)

// query management
router.get('/querymanagement/:message', queryc.querymanagementform)
router.get('/querymanagementdelete/:querydelete/', queryc.querydelete)
router.get('/queryform/:email/:query/:id', queryc.queryform).post('/queryform/:email/:query/:id', queryc.queryformpost)

module.exports = router
