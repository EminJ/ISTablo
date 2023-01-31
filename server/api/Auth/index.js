const router = require('express').Router();
const create = require('./create')
const login = require('./login')
const admin = require('./admin')
const Users = require('../model/users')
const jwt = require('jsonwebtoken')

router.post('/usertested',async (req,res)=>{
	if(!req.body.token) return res.status(400).send(message('Token Bulunamadı!',400))
    try {
        const decoded = jwt.verify(req.body.token, process.env.SECURTY_KEY);
        
        Users.findById(decoded.user._id).then((req)=>{
            return res.status(200).send(message({user:req},200))
        })
        .catch((err)=>{
            return res.status(400).send(message('Hata Oluştu!',400))
        })
    } catch (error) {
        return res.status(400).send(message('Hata Oluştu!',400))
    }
})

router.use('/create',create)
router.use('/login',login)
router.use('/admin',admin)

function message(message,status) {return {send:'Istanbul Tablo',message:message,status:status}}


module.exports = router;